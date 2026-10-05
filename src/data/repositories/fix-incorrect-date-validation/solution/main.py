from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone

app = FastAPI()

class Event(BaseModel):
    name: str
    event_date: datetime

@app.post("/events")
def create_event(event: Event):
    # Use timezone-aware UTC datetime for the current time
    now = datetime.now(timezone.utc)
    
    event_date = event.event_date
    # If the provided date is naive, assume it is in UTC
    if event_date.tzinfo is None:
        event_date = event_date.replace(tzinfo=timezone.utc)
        
    if event_date < now + timedelta(hours=24):
        raise HTTPException(status_code=400, detail="Event must be at least 24 hours in advance")
        
    return {"id": 1, "name": event.name, "event_date": event.event_date}
