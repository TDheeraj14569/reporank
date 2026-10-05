class MockDBSession:
    def query(self, model):
        return self
    def filter(self, condition):
        return self
    def first(self):
        from app.models.product import Product
        return Product(1, 10)
    def commit(self):
        pass

db_session = MockDBSession()
