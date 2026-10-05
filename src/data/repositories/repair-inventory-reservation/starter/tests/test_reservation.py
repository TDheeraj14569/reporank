from app.services.inventory_service import reserve_stock

def test_concurrent_reservation():
    # Test mock failure indicating race condition
    assert False, "Oversold inventory"
