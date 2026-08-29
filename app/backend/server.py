from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("GreenRouteAPI")

# Initial In-Memory Seed Data for Resilient Standalone Operation
SEED_BINS = [
    {
        "id": "bin-1",
        "code": "BIN-101",
        "location": "Market Square & 4th Street",
        "sector": "Central Commercial",
        "type": "Organic",
        "capacity": 360,
        "fillLevel": 58,
        "battery": 92,
        "lastEmptied": "2 hours ago",
        "status": "Operational",
        "sensorHealth": "Active",
    },
    {
        "id": "bin-2",
        "code": "BIN-104",
        "location": "120 Market Street Plaza",
        "sector": "Central Commercial",
        "type": "Recyclable",
        "capacity": 240,
        "fillLevel": 94,
        "battery": 88,
        "lastEmptied": "Yesterday",
        "status": "Critical",
        "sensorHealth": "Active",
    },
    {
        "id": "bin-3",
        "code": "BIN-201",
        "location": "Greenway Park - Main Entrance",
        "sector": "North Sector",
        "type": "Recyclable",
        "capacity": 240,
        "fillLevel": 42,
        "battery": 98,
        "lastEmptied": "5 hours ago",
        "status": "Operational",
        "sensorHealth": "Active",
    },
    {
        "id": "bin-4",
        "code": "BIN-205",
        "location": "North High School Campus",
        "sector": "North Sector",
        "type": "General",
        "capacity": 660,
        "fillLevel": 76,
        "battery": 34,
        "lastEmptied": "3 hours ago",
        "status": "Warning",
        "sensorHealth": "Active",
    },
    {
        "id": "bin-5",
        "code": "BIN-302",
        "location": "Tech District Innovation Hub",
        "sector": "Industrial Park",
        "type": "Hazardous",
        "capacity": 120,
        "fillLevel": 30,
        "battery": 85,
        "lastEmptied": "1 day ago",
        "status": "Operational",
        "sensorHealth": "Active",
    },
    {
        "id": "bin-6",
        "code": "BIN-305",
        "location": "Metro Rail Station Concourse",
        "sector": "Central Commercial",
        "type": "Recyclable",
        "capacity": 480,
        "fillLevel": 88,
        "battery": 91,
        "lastEmptied": "4 hours ago",
        "status": "Critical",
        "sensorHealth": "Active",
    },
]

SEED_SCHEDULES = [
    {
        "id": "RT-101",
        "name": "Downtown Commercial & Retail Loop",
        "sector": "Central Commercial",
        "driver": "Marcus Vance",
        "truck": "EV CleanHaul #04",
        "status": "In Progress",
        "stops": 14,
        "completedStops": 10,
        "distanceKm": 18.4,
        "fuelSavedL": 6.2,
        "eta": "14:30 PM",
    },
    {
        "id": "RT-102",
        "name": "North Residential & Park Sector",
        "sector": "North Sector",
        "driver": "Elena Rostova",
        "truck": "CNG Compactor #02",
        "status": "Scheduled",
        "stops": 22,
        "completedStops": 0,
        "distanceKm": 28.0,
        "fuelSavedL": 9.8,
        "eta": "16:00 PM",
    },
]

SEED_ALERTS = [
    {
        "id": "ALT-801",
        "title": "Critical Overflow Warning: Bin #BIN-104",
        "message": "Ultrasonic sensor reading 96% fill level at 120 Market Street. High risk of street spillage.",
        "severity": "Critical",
        "location": "120 Market St (Central Commercial)",
        "timestamp": "12 minutes ago",
        "status": "Active",
        "binCode": "BIN-104",
    },
    {
        "id": "ALT-802",
        "title": "Missed Scheduled Collection on Route #RT-101",
        "message": "Collection vehicle delayed due to traffic congestion on 5th Avenue. Estimated 25 min delay.",
        "severity": "Warning",
        "location": "North Sector residential corridor",
        "timestamp": "45 minutes ago",
        "status": "Active",
        "binCode": None,
    },
]

# In-Memory Storage
memory_bins = list(SEED_BINS)
memory_schedules = list(SEED_SCHEDULES)
memory_alerts = list(SEED_ALERTS)
memory_status_checks = []

# Resilient MongoDB Client initialization
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'greenroute_database')

mongo_client = None
db = None

try:
    mongo_client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=1000)
    db = mongo_client[db_name]
except Exception as e:
    logger.warning(f"MongoDB connection initialized in in-memory fallback mode: {e}")

# Create the main FastAPI app
app = FastAPI(
    title="GreenRoute Smart Waste Management API",
    description="IoT telemetry, dynamic collection routing, and citizen recycling intelligence.",
    version="2.0.0"
)

# API Router with /api prefix
api_router = APIRouter(prefix="/api")

# Pydantic Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class BinModel(BaseModel):
    id: Optional[str] = None
    code: str
    location: str
    sector: str
    type: str
    capacity: int = 240
    fillLevel: int = 0
    battery: int = 100
    lastEmptied: Optional[str] = "Recently"
    status: Optional[str] = "Operational"
    sensorHealth: Optional[str] = "Active"

class BinUpdate(BaseModel):
    fillLevel: Optional[int] = None
    battery: Optional[int] = None
    status: Optional[str] = None
    lastEmptied: Optional[str] = None

class ScheduleModel(BaseModel):
    id: Optional[str] = None
    name: str
    sector: str
    driver: str
    truck: str
    status: Optional[str] = "Scheduled"
    stops: int = 10
    completedStops: Optional[int] = 0
    distanceKm: Optional[float] = 20.0
    fuelSavedL: Optional[float] = 4.0
    eta: Optional[str] = "Tomorrow 09:00 AM"

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str
    category: Optional[str] = "General Advice"

# ----------------- Endpoints ----------------- #

@api_router.get("/")
async def root():
    return {
        "message": "GreenRoute Smart Waste Management API Operational",
        "version": "2.0.0",
        "status": "online"
    }

# Status Check Endpoints
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    memory_status_checks.append(status_obj)
    
    if db is not None:
        try:
            doc = status_obj.model_dump()
            doc['timestamp'] = doc['timestamp'].isoformat()
            await asyncio.wait_for(db.status_checks.insert_one(doc), timeout=1.0)
        except Exception:
            pass
            
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is not None:
        try:
            results = await asyncio.wait_for(db.status_checks.find({}, {"_id": 0}).to_list(100), timeout=1.0)
            if results:
                for check in results:
                    if isinstance(check.get('timestamp'), str):
                        check['timestamp'] = datetime.fromisoformat(check['timestamp'])
                return results
        except Exception:
            pass
            
    return memory_status_checks

# Smart Bins Endpoints
@api_router.get("/bins", response_model=List[BinModel])
async def get_bins():
    if db is not None:
        try:
            bins = await asyncio.wait_for(db.bins.find({}, {"_id": 0}).to_list(100), timeout=1.0)
            if bins:
                return bins
        except Exception:
            pass
    return memory_bins

@api_router.post("/bins", response_model=BinModel)
async def create_bin(bin_input: BinModel):
    if not bin_input.id:
        bin_input.id = f"bin-{uuid.uuid4().hex[:6]}"
    
    bin_dict = bin_input.model_dump()
    memory_bins.insert(0, bin_dict)
    
    if db is not None:
        try:
            await asyncio.wait_for(db.bins.insert_one(dict(bin_dict)), timeout=1.0)
        except Exception:
            pass
            
    return bin_input

@api_router.put("/bins/{bin_id}", response_model=BinModel)
async def update_bin(bin_id: str, updates: BinUpdate):
    for b in memory_bins:
        if b.get("id") == bin_id or b.get("code") == bin_id:
            update_data = {k: v for k, v in updates.model_dump().items() if v is not None}
            b.update(update_data)
            return b
    raise HTTPException(status_code=404, detail="Bin not found")

@api_router.post("/bins/{bin_id}/simulate")
async def simulate_bin_fill(bin_id: str):
    for b in memory_bins:
        if b.get("id") == bin_id or b.get("code") == bin_id:
            b["fillLevel"] = min(100, b.get("fillLevel", 0) + 15)
            if b["fillLevel"] >= 85:
                b["status"] = "Critical"
            return {"message": "Fill level updated", "fillLevel": b["fillLevel"]}
    raise HTTPException(status_code=404, detail="Bin not found")

# Collection Schedules Endpoints
@api_router.get("/schedules", response_model=List[ScheduleModel])
async def get_schedules():
    return memory_schedules

@api_router.post("/schedules", response_model=ScheduleModel)
async def create_schedule(sched: ScheduleModel):
    if not sched.id:
        sched.id = f"RT-{uuid.uuid4().hex[:4].upper()}"
    sched_dict = sched.model_dump()
    memory_schedules.append(sched_dict)
    return sched

@api_router.post("/schedules/optimize")
async def optimize_routes():
    for r in memory_schedules:
        if r.get("status") != "Completed":
            r["distanceKm"] = round(max(5.0, r.get("distanceKm", 20.0) * 0.88), 1)
            r["fuelSavedL"] = round(r.get("fuelSavedL", 2.0) + 1.8, 1)
    return {
        "message": "AI Route optimization completed",
        "routes": memory_schedules,
        "fuelSavingsTotal": sum(r.get("fuelSavedL", 0) for r in memory_schedules)
    }

# Analytics Endpoint
@api_router.get("/analytics")
async def get_analytics():
    return {
        "diversionRate": 78.4,
        "co2OffsetTons": 16.9,
        "totalRecycledTons": 65.4,
        "activeSmartBins": len(memory_bins),
        "materialBreakdown": [
            {"category": "Organic Compost", "percentage": 42, "tons": 27.5},
            {"category": "Plastics & Paper", "percentage": 36, "tons": 23.5},
            {"category": "Hazardous / E-Waste", "percentage": 6, "tons": 3.9},
            {"category": "Landfill Residual", "percentage": 16, "tons": 10.5},
        ]
    }

# Alerts Endpoints
@api_router.get("/alerts")
async def get_alerts():
    return memory_alerts

@api_router.put("/alerts/{alert_id}/resolve")
async def resolve_alert(alert_id: str):
    for a in memory_alerts:
        if a.get("id") == alert_id:
            a["status"] = "Resolved"
            a["severity"] = "Resolved"
            return {"message": "Alert resolved", "alert": a}
    raise HTTPException(status_code=404, detail="Alert not found")

# AI Waste Classification Support Assistant
@api_router.post("/chat", response_model=ChatResponse)
async def chat_assistant(req: ChatRequest):
    q = req.message.lower()
    if "paint" in q or "chemical" in q or "toxic" in q:
        reply = "Liquid paints, pesticides, and solvent chemicals must never go in municipal bins or down sinks. Please drop them off at the Industrial Park Household Hazardous Waste Hub (Open Tue-Sat 8:00 AM - 4:00 PM)."
        cat = "Hazardous Waste"
    elif "styrofoam" in q or "foam" in q or "polystyrene" in q:
        reply = "Polystyrene (Styrofoam) should not be placed into curbside blue recycling bins as it crumbles into microplastics. Check for specialized community drop-off depots or place in general municipal waste."
        cat = "Recycling Exception"
    elif "pizza" in q or "grease" in q or "food box" in q:
        reply = "Tear the clean top lid off the pizza box and place it in the blue paper recycling bin. The grease-saturated bottom belongs in the green organic compost bin."
        cat = "Organic & Compost"
    elif "battery" in q or "lithium" in q or "electronic" in q:
        reply = "Lithium and rechargeable batteries must never be placed in household curbside bins due to fire hazard under compaction. Please deposit them in dedicated battery collection tubes at city libraries or municipal drop-offs."
        cat = "E-Waste Safety"
    elif "schedule" in q or "pickup" in q or "truck" in q:
        reply = "Municipal collection routes run Monday through Friday from 06:00 AM to 04:30 PM. For oversized appliances or bulk furniture, you can book a prioritized pickup via the Collection Routes dashboard."
        cat = "Logistics"
    else:
        reply = "GreenRoute sorting rule: Organics and food scraps belong in Green bins, clean rigid plastics, glass, metals and paper go in Blue bins, and electronics go to Red designated points. Feel free to ask about any specific item!"
        cat = "General Advice"
    
    return ChatResponse(reply=reply, category=cat)

# Include Router
app.include_router(api_router)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    if mongo_client:
        mongo_client.close()
