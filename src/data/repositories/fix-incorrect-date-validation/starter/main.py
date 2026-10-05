from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta

app = FastAPI()

class Event(BaseModel):
    name: str
    event_date: datetime

@app.post("/events")
def create_event(event: Event):
    # Require events to be scheduled at least 24 hours in advance
    now = datetime.utcnow()
    
    # BUG: If event_date is timezone-aware, this comparison raises a TypeError
    # "can't compare offset-naive and offset-aware datetimes"
    if event.event_date < now + timedelta(hours=24):
        raise HTTPException(status_code=400, detail="Event must be at least 24 hours in advance")
        
    return {"id": 1, "name": event.name, "event_date": event.event_date}
