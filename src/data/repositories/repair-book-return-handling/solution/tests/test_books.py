from app.services.book_service import return_book
class Book:
    def __init__(self): self.is_available = False; self.borrower_id = 1

def test_return_book():
    b = Book()
    return_book(b)
    assert b.is_available == True, "Book not marked available"
