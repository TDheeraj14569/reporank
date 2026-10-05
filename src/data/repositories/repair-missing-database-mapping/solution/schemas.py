from pydantic import BaseModel

class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    department: str
    role: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True
