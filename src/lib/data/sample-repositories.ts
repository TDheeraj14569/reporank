/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FullRepository {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  taskType: string;
  technology: string[];
  language: string;
  estimatedTimeMinutes: number;
  skills: string[];
  tags: string[];
  companyPattern: string;
  repositoryName: string;
  files: any[];
  editableFiles: string[];
  readOnlyFiles: string[];
  runCommand: string;
  testCommand: string;
  visibleTests: any[];
  hiddenTestCount: number;
  requirements: string[];
  constraints: string[];
  acceptanceCriteria: string[];
  hints: any[];
  editorial: any;
}

export const sampleRepositories: Record<string, FullRepository> = {
  'fix-order-state-machine': {
    id: 'repo-001',
    slug: 'fix-order-state-machine',
    title: 'Order Service - State Machine Fix',
    description: 'The order service has a bug where a cancelled order can still be marked as shipped. Fix the state machine to prevent invalid transitions from a CANCELLED state.',
    difficulty: 'medium',
    taskType: 'bug-fix',
    technology: ['Java', 'Spring Boot'],
    language: 'java',
    estimatedTimeMinutes: 30,
    skills: ['Java', 'Spring', 'State Machine', 'Validation'],
    tags: ['backend', 'spring-boot', 'bug'],
    companyPattern: 'E-commerce',
    repositoryName: 'order-service',
    files: [
      {
        id: 'f1',
        name: 'README.md',
        path: 'README.md',
        content: '# Order Service\n\nThis is a Spring Boot application managing orders.\n\n## Requirements\n- Prevent cancelled orders from transitioning to any other state (like SHIPPED).\n\n## Running tests\n`mvn test`\n',
        language: 'markdown',
        type: 'file',
        size: 150
      },
      {
        id: 'f2',
        name: 'OrderController.java',
        path: 'src/main/java/com/orderservice/controller/OrderController.java',
        content: 'package com.orderservice.controller;\n\nimport com.orderservice.service.OrderService;\nimport com.orderservice.model.OrderStatus;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping("/api/orders")\npublic class OrderController {\n    private final OrderService orderService;\n\n    public OrderController(OrderService orderService) {\n        this.orderService = orderService;\n    }\n\n    @PutMapping("/{id}/status")\n    public void updateStatus(@PathVariable String id, @RequestParam OrderStatus status) {\n        orderService.updateOrderStatus(id, status);\n    }\n}\n',
        language: 'java',
        type: 'file',
        size: 400
      },
      {
        id: 'f3',
        name: 'OrderService.java',
        path: 'src/main/java/com/orderservice/service/OrderService.java',
        content: 'package com.orderservice.service;\n\nimport com.orderservice.model.Order;\nimport com.orderservice.model.OrderStatus;\nimport com.orderservice.repository.OrderRepository;\nimport com.orderservice.exception.InvalidStateTransitionException;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class OrderService {\n    private final OrderRepository orderRepository;\n\n    public OrderService(OrderRepository orderRepository) {\n        this.orderRepository = orderRepository;\n    }\n\n    public void updateOrderStatus(String orderId, OrderStatus newStatus) {\n        Order order = orderRepository.findById(orderId)\n            .orElseThrow(() -> new RuntimeException("Order not found"));\n        \n        // BUG: Missing check if current status is CANCELLED\n        if (order.getStatus() == OrderStatus.DELIVERED) {\n            throw new InvalidStateTransitionException("Cannot change status of delivered order");\n        }\n\n        order.setStatus(newStatus);\n        orderRepository.save(order);\n    }\n}\n',
        language: 'java',
        type: 'file',
        size: 800
      },
      {
        id: 'f4',
        name: 'OrderRepository.java',
        path: 'src/main/java/com/orderservice/repository/OrderRepository.java',
        content: 'package com.orderservice.repository;\n\nimport com.orderservice.model.Order;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\n\n@Repository\npublic interface OrderRepository extends JpaRepository<Order, String> {\n}\n',
        language: 'java',
        type: 'file',
        size: 200
      },
      {
        id: 'f5',
        name: 'Order.java',
        path: 'src/main/java/com/orderservice/model/Order.java',
        content: 'package com.orderservice.model;\n\nimport javax.persistence.Entity;\nimport javax.persistence.Id;\nimport javax.persistence.Table;\n\n@Entity\n@Table(name = "orders")\npublic class Order {\n    @Id\n    private String id;\n    private OrderStatus status;\n\n    public String getId() { return id; }\n    public void setId(String id) { this.id = id; }\n    public OrderStatus getStatus() { return status; }\n    public void setStatus(OrderStatus status) { this.status = status; }\n}\n',
        language: 'java',
        type: 'file',
        size: 400
      },
      {
        id: 'f6',
        name: 'OrderStatus.java',
        path: 'src/main/java/com/orderservice/model/OrderStatus.java',
        content: 'package com.orderservice.model;\n\npublic enum OrderStatus {\n    CREATED,\n    CONFIRMED,\n    SHIPPED,\n    DELIVERED,\n    CANCELLED\n}\n',
        language: 'java',
        type: 'file',
        size: 150
      },
      {
        id: 'f7',
        name: 'OrderException.java',
        path: 'src/main/java/com/orderservice/exception/OrderException.java',
        content: 'package com.orderservice.exception;\n\npublic class OrderException extends RuntimeException {\n    public OrderException(String message) { super(message); }\n}\n',
        language: 'java',
        type: 'file',
        size: 150
      },
      {
        id: 'f8',
        name: 'InvalidStateTransitionException.java',
        path: 'src/main/java/com/orderservice/exception/InvalidStateTransitionException.java',
        content: 'package com.orderservice.exception;\n\npublic class InvalidStateTransitionException extends RuntimeException {\n    public InvalidStateTransitionException(String message) { super(message); }\n}\n',
        language: 'java',
        type: 'file',
        size: 180
      },
      {
        id: 'f9',
        name: 'OrderCreationTest.java',
        path: 'src/test/java/com/orderservice/OrderCreationTest.java',
        content: 'package com.orderservice;\n\nimport org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.assertTrue;\n\npublic class OrderCreationTest {\n    @Test\n    public void testOrderCreation() {\n        assertTrue(true);\n    }\n}\n',
        language: 'java',
        type: 'file',
        size: 200
      },
      {
        id: 'f10',
        name: 'OrderCancellationTest.java',
        path: 'src/test/java/com/orderservice/OrderCancellationTest.java',
        content: 'package com.orderservice;\n\nimport com.orderservice.service.OrderService;\nimport com.orderservice.model.Order;\nimport com.orderservice.model.OrderStatus;\nimport com.orderservice.repository.OrderRepository;\nimport com.orderservice.exception.InvalidStateTransitionException;\nimport org.junit.jupiter.api.Test;\nimport org.mockito.Mockito;\nimport java.util.Optional;\nimport static org.junit.jupiter.api.Assertions.assertThrows;\nimport static org.mockito.ArgumentMatchers.any;\n\npublic class OrderCancellationTest {\n    @Test\n    public void testCannotShipCancelledOrder() {\n        OrderRepository repo = Mockito.mock(OrderRepository.class);\n        Order order = new Order();\n        order.setId("1");\n        order.setStatus(OrderStatus.CANCELLED);\n        Mockito.when(repo.findById("1")).thenReturn(Optional.of(order));\n        \n        OrderService service = new OrderService(repo);\n        assertThrows(InvalidStateTransitionException.class, () -> {\n            service.updateOrderStatus("1", OrderStatus.SHIPPED);\n        });\n    }\n}\n',
        language: 'java',
        type: 'file',
        size: 700
      },
      {
        id: 'f11',
        name: 'OrderStatusTransitionTest.java',
        path: 'src/test/java/com/orderservice/OrderStatusTransitionTest.java',
        content: 'package com.orderservice;\n\nimport org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.assertTrue;\n\npublic class OrderStatusTransitionTest {\n    @Test\n    public void testValidTransition() {\n        assertTrue(true);\n    }\n}\n',
        language: 'java',
        type: 'file',
        size: 200
      },
      {
        id: 'f12',
        name: 'pom.xml',
        path: 'pom.xml',
        content: '<project>\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.orderservice</groupId>\n  <artifactId>order-service</artifactId>\n  <version>1.0.0</version>\n  <dependencies>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-data-jpa</artifactId>\n    </dependency>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-test</artifactId>\n      <scope>test</scope>\n    </dependency>\n  </dependencies>\n</project>\n',
        language: 'xml',
        type: 'file',
        size: 500
      }
    ],
    editableFiles: ['src/main/java/com/orderservice/service/OrderService.java'],
    readOnlyFiles: ['pom.xml'],
    runCommand: 'mvn spring-boot:run',
    testCommand: 'mvn test',
    visibleTests: [
      { id: 't1', name: 'OrderCreationTest.testOrderCreation', status: 'passed', error: null, timeMs: 45, isPassed: true },
      { id: 't2', name: 'OrderStatusTransitionTest.testValidTransition', status: 'passed', error: null, timeMs: 23, isPassed: true },
      { id: 't3', name: 'OrderCancellationTest.testCannotShipCancelledOrder', status: 'failed', error: 'Expected InvalidStateTransitionException but none was thrown', timeMs: 50, isPassed: false }
    ],
    hiddenTestCount: 5,
    requirements: ['Prevent transition from CANCELLED state.'],
    constraints: ['Must use Java 11+', 'Spring Boot 2.7+'],
    acceptanceCriteria: ['All tests pass, including the cancellation test.'],
    hints: [{ id: 'h1', text: 'Check the current state in OrderService.updateOrderStatus before modifying it.' }],
    editorial: {
      content: 'The bug is caused by a missing state check. Add `if(order.getStatus() == OrderStatus.CANCELLED) throw new InvalidStateTransitionException(...)` to OrderService.java.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 2
    }
  },
  'repair-inventory-reservation': {
    id: 'repo-002',
    slug: 'repair-inventory-reservation',
    title: 'Inventory Service - Reservation Bug',
    description: 'Inventory reservations are causing overselling due to a race condition. Make the reservation atomic.',
    difficulty: 'medium',
    taskType: 'bug-fix',
    technology: ['Python', 'FastAPI'],
    language: 'python',
    estimatedTimeMinutes: 30,
    skills: ['Python', 'Concurrency', 'FastAPI'],
    tags: ['backend', 'python', 'bug'],
    companyPattern: 'E-commerce',
    repositoryName: 'inventory-service',
    files: [
      {
        id: 'f1',
        name: 'README.md',
        path: 'README.md',
        content: '# Inventory Service\nFix the race condition in the inventory reservation logic.',
        language: 'markdown',
        type: 'file',
        size: 100
      },
      {
        id: 'f2',
        name: 'main.py',
        path: 'app/main.py',
        content: 'from fastapi import FastAPI\nfrom app.routes import inventory\n\napp = FastAPI()\napp.include_router(inventory.router)\n',
        language: 'python',
        type: 'file',
        size: 150
      },
      {
        id: 'f3',
        name: 'inventory.py',
        path: 'app/routes/inventory.py',
        content: 'from fastapi import APIRouter, Depends\nfrom app.services.inventory_service import reserve_stock\n\nrouter = APIRouter()\n\n@router.post("/reserve")\ndef reserve(product_id: int, quantity: int):\n    return reserve_stock(product_id, quantity)\n',
        language: 'python',
        type: 'file',
        size: 250
      },
      {
        id: 'f4',
        name: 'inventory_service.py',
        path: 'app/services/inventory_service.py',
        content: 'from app.database import db_session\nfrom app.models.product import Product\n\ndef reserve_stock(product_id: int, quantity: int):\n    product = db_session.query(Product).filter(Product.id == product_id).first()\n    if not product:\n        raise ValueError("Product not found")\n    \n    # BUG: Non-atomic read-then-write\n    if product.stock >= quantity:\n        product.stock -= quantity\n        db_session.commit()\n        return True\n    return False\n',
        language: 'python',
        type: 'file',
        size: 450
      },
      {
        id: 'f5',
        name: 'product.py',
        path: 'app/models/product.py',
        content: 'class Product:\n    def __init__(self, id, stock):\n        self.id = id\n        self.stock = stock\n',
        language: 'python',
        type: 'file',
        size: 150
      },
      {
        id: 'f6',
        name: 'database.py',
        path: 'app/database.py',
        content: 'class MockDBSession:\n    def query(self, model):\n        return self\n    def filter(self, condition):\n        return self\n    def first(self):\n        from app.models.product import Product\n        return Product(1, 10)\n    def commit(self):\n        pass\n\ndb_session = MockDBSession()\n',
        language: 'python',
        type: 'file',
        size: 300
      },
      {
        id: 'f7',
        name: 'test_inventory.py',
        path: 'tests/test_inventory.py',
        content: 'def test_reservation_success():\n    assert True\n',
        language: 'python',
        type: 'file',
        size: 100
      },
      {
        id: 'f8',
        name: 'test_reservation.py',
        path: 'tests/test_reservation.py',
        content: 'from app.services.inventory_service import reserve_stock\n\ndef test_concurrent_reservation():\n    # Test mock failure indicating race condition\n    assert False, "Oversold inventory"\n',
        language: 'python',
        type: 'file',
        size: 200
      }
    ],
    editableFiles: ['app/services/inventory_service.py'],
    readOnlyFiles: ['tests/test_reservation.py'],
    runCommand: 'uvicorn app.main:app',
    testCommand: 'pytest',
    visibleTests: [
      { id: 't1', name: 'test_reservation_success', status: 'passed', error: null, timeMs: 10, isPassed: true },
      { id: 't2', name: 'test_concurrent_reservation', status: 'failed', error: 'Oversold inventory', timeMs: 15, isPassed: false }
    ],
    hiddenTestCount: 4,
    requirements: ['Use atomic operations or locks to prevent overselling.'],
    constraints: [],
    acceptanceCriteria: ['All tests pass, avoiding race conditions.'],
    hints: [{ id: 'h1', text: 'Use select_for_update or a synchronized lock.' }],
    editorial: {
      content: 'Update the query to use an atomic update or row-level lock.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 2
    }
  },
  'fix-payment-retry-logic': {
    id: 'repo-003',
    slug: 'fix-payment-retry-logic',
    title: 'Payment Service - Idempotency Bug',
    description: 'Payment retries are causing duplicate charges due to missing idempotency checks.',
    difficulty: 'hard',
    taskType: 'bug-fix',
    technology: ['Node.js', 'Express'],
    language: 'javascript',
    estimatedTimeMinutes: 45,
    skills: ['Node.js', 'Idempotency', 'Payments'],
    tags: ['backend', 'nodejs', 'bug'],
    companyPattern: 'Fintech',
    repositoryName: 'payment-service',
    files: [
      {
        id: 'f1',
        name: 'README.md',
        path: 'README.md',
        content: '# Payment Service\nFix duplicate charges in payment retries.',
        language: 'markdown',
        type: 'file',
        size: 100
      },
      {
        id: 'f2',
        name: 'index.js',
        path: 'src/index.js',
        content: 'const express = require("express");\nconst paymentRoutes = require("./routes/payments");\nconst app = express();\napp.use(express.json());\napp.use("/payments", paymentRoutes);\napp.listen(3000);\n',
        language: 'javascript',
        type: 'file',
        size: 200
      },
      {
        id: 'f3',
        name: 'payments.js',
        path: 'src/routes/payments.js',
        content: 'const express = require("express");\nconst router = express.Router();\nconst { processPayment } = require("../services/paymentService");\n\nrouter.post("/", async (req, res) => {\n  const result = await processPayment(req.body);\n  res.json(result);\n});\nmodule.exports = router;\n',
        language: 'javascript',
        type: 'file',
        size: 300
      },
      {
        id: 'f4',
        name: 'paymentService.js',
        path: 'src/services/paymentService.js',
        content: 'const transactions = [];\n\nasync function processPayment(data) {\n  const { amount, idempotencyKey } = data;\n  \n  // BUG: No check if idempotencyKey already exists in transactions\n  const transaction = { id: Date.now(), amount, idempotencyKey, status: "SUCCESS" };\n  transactions.push(transaction);\n  \n  return transaction;\n}\n\nmodule.exports = { processPayment, transactions };\n',
        language: 'javascript',
        type: 'file',
        size: 400
      },
      {
        id: 'f5',
        name: 'payment.test.js',
        path: 'tests/payment.test.js',
        content: 'test("Normal payment processing", () => {\n  expect(true).toBe(true);\n});\n',
        language: 'javascript',
        type: 'file',
        size: 100
      },
      {
        id: 'f6',
        name: 'retry.test.js',
        path: 'tests/retry.test.js',
        content: 'const { processPayment, transactions } = require("../src/services/paymentService");\n\ntest("Retry should not duplicate charge", async () => {\n  transactions.length = 0;\n  await processPayment({ amount: 100, idempotencyKey: "abc" });\n  await processPayment({ amount: 100, idempotencyKey: "abc" });\n  \n  if (transactions.length > 1) {\n    throw new Error("Duplicate charge created!");\n  }\n});\n',
        language: 'javascript',
        type: 'file',
        size: 400
      }
    ],
    editableFiles: ['src/services/paymentService.js'],
    readOnlyFiles: ['tests/retry.test.js'],
    runCommand: 'node src/index.js',
    testCommand: 'npm test',
    visibleTests: [
      { id: 't1', name: 'Normal payment processing', status: 'passed', error: null, timeMs: 5, isPassed: true },
      { id: 't2', name: 'Retry should not duplicate charge', status: 'failed', error: 'Duplicate charge created!', timeMs: 15, isPassed: false }
    ],
    hiddenTestCount: 8,
    requirements: ['Ensure idempotent payments.'],
    constraints: [],
    acceptanceCriteria: ['All tests pass, duplicate charges prevented.'],
    hints: [{ id: 'h1', text: 'Check the transactions array before pushing.' }],
    editorial: {
      content: 'Find existing transactions by idempotencyKey and return the original result if found.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 2
    }
  },
  'repair-book-return-handling': {
    id: 'repo-004',
    slug: 'repair-book-return-handling',
    title: 'Book Rental Service - Return Bug',
    description: 'Book return logic fails to update the availability flag.',
    difficulty: 'easy',
    taskType: 'bug-fix',
    technology: ['Python', 'FastAPI'],
    language: 'python',
    estimatedTimeMinutes: 15,
    skills: ['Python', 'FastAPI'],
    tags: ['backend', 'python', 'bug'],
    companyPattern: 'Library',
    repositoryName: 'book-rental-service',
    files: [
      {
        id: 'f1',
        name: 'book_service.py',
        path: 'app/services/book_service.py',
        content: 'def return_book(book):\n    # BUG: Forgot to set book.is_available = True\n    book.borrower_id = None\n    return book\n',
        language: 'python',
        type: 'file',
        size: 150
      },
      {
        id: 'f2',
        name: 'test_books.py',
        path: 'tests/test_books.py',
        content: 'from app.services.book_service import return_book\nclass Book:\n    def __init__(self): self.is_available = False; self.borrower_id = 1\n\ndef test_return_book():\n    b = Book()\n    return_book(b)\n    assert b.is_available == True, "Book not marked available"\n',
        language: 'python',
        type: 'file',
        size: 300
      }
    ],
    editableFiles: ['app/services/book_service.py'],
    readOnlyFiles: ['tests/test_books.py'],
    runCommand: 'uvicorn app.main:app',
    testCommand: 'pytest',
    visibleTests: [
      { id: 't1', name: 'test_return_book', status: 'failed', error: 'Book not marked available', timeMs: 5, isPassed: false }
    ],
    hiddenTestCount: 4,
    requirements: ['Update is_available on return.'],
    constraints: [],
    acceptanceCriteria: ['Test passes.'],
    hints: [{ id: 'h1', text: 'Set is_available to True.' }],
    editorial: {
      content: 'Add `book.is_available = True` to `return_book`.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 1
    }
  },
  'fix-employee-leave-validation': {
    id: 'repo-005',
    slug: 'fix-employee-leave-validation',
    title: 'Employee Leave Service - Validation Bug',
    description: 'Leave validation allows overlapping leave dates.',
    difficulty: 'easy',
    taskType: 'bug-fix',
    technology: ['Java', 'Spring Boot'],
    language: 'java',
    estimatedTimeMinutes: 20,
    skills: ['Java', 'Validation'],
    tags: ['backend', 'java', 'bug'],
    companyPattern: 'HR Tech',
    repositoryName: 'employee-leave-service',
    files: [
      {
        id: 'f1',
        name: 'LeaveService.java',
        path: 'src/main/java/com/hr/service/LeaveService.java',
        content: 'package com.hr.service;\n\npublic class LeaveService {\n    public boolean isValidLeave(String startDate, String endDate) {\n        // BUG: Incomplete overlap logic in real app, here simulated by returning true blindly\n        return true;\n    }\n}\n',
        language: 'java',
        type: 'file',
        size: 250
      },
      {
        id: 'f2',
        name: 'LeaveValidationTest.java',
        path: 'src/test/java/com/hr/LeaveValidationTest.java',
        content: 'package com.hr;\n\nimport com.hr.service.LeaveService;\nimport org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.assertFalse;\n\npublic class LeaveValidationTest {\n    @Test\n    public void testOverlappingLeave() {\n        LeaveService service = new LeaveService();\n        // In a real test, this would setup existing leaves and check overlap.\n        // Assuming this test fails when it shouldn\'t allow overlap.\n        boolean isValid = service.isValidLeave("2024-01-01", "2024-01-10");\n        // We just force a failure for the simulation\n        assertFalse(isValid, "Overlapping leave was allowed");\n    }\n}\n',
        language: 'java',
        type: 'file',
        size: 600
      }
    ],
    editableFiles: ['src/main/java/com/hr/service/LeaveService.java'],
    readOnlyFiles: ['src/test/java/com/hr/LeaveValidationTest.java'],
    runCommand: 'mvn spring-boot:run',
    testCommand: 'mvn test',
    visibleTests: [
      { id: 't1', name: 'testOverlappingLeave', status: 'failed', error: 'Overlapping leave was allowed', timeMs: 50, isPassed: false }
    ],
    hiddenTestCount: 4,
    requirements: ['Fix overlap logic.'],
    constraints: [],
    acceptanceCriteria: ['Test passes.'],
    hints: [{ id: 'h1', text: 'Implement overlap check.' }],
    editorial: {
      content: 'Fix the overlap check logic.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 1
    }
  },
  'fix-cart-synchronization': {
    id: 'repo-006',
    slug: 'fix-cart-synchronization',
    title: 'Shopping Cart Service - Sync Bug',
    description: 'Cart total does not recalculate when item quantities change.',
    difficulty: 'medium',
    taskType: 'bug-fix',
    technology: ['Node.js', 'Express'],
    language: 'javascript',
    estimatedTimeMinutes: 30,
    skills: ['Node.js', 'State Management'],
    tags: ['backend', 'nodejs', 'bug'],
    companyPattern: 'E-commerce',
    repositoryName: 'shopping-cart-service',
    files: [
      {
        id: 'f1',
        name: 'cartService.js',
        path: 'src/services/cartService.js',
        content: 'function updateItemQuantity(cart, itemId, quantity) {\n  const item = cart.items.find(i => i.id === itemId);\n  if (item) {\n    item.quantity = quantity;\n    // BUG: Missing cart.total = calculateTotal(cart.items);\n  }\n  return cart;\n}\nmodule.exports = { updateItemQuantity };\n',
        language: 'javascript',
        type: 'file',
        size: 300
      },
      {
        id: 'f2',
        name: 'cart.test.js',
        path: 'tests/cart.test.js',
        content: 'const { updateItemQuantity } = require("../src/services/cartService");\n\ntest("Total should update when quantity changes", () => {\n  const cart = { items: [{ id: 1, price: 10, quantity: 1 }], total: 10 };\n  updateItemQuantity(cart, 1, 3);\n  if (cart.total !== 30) throw new Error("Total not updated");\n});\n',
        language: 'javascript',
        type: 'file',
        size: 300
      }
    ],
    editableFiles: ['src/services/cartService.js'],
    readOnlyFiles: ['tests/cart.test.js'],
    runCommand: 'node src/index.js',
    testCommand: 'npm test',
    visibleTests: [
      { id: 't1', name: 'Total should update when quantity changes', status: 'failed', error: 'Total not updated', timeMs: 5, isPassed: false }
    ],
    hiddenTestCount: 6,
    requirements: ['Update cart total on quantity change.'],
    constraints: [],
    acceptanceCriteria: ['Test passes.'],
    hints: [{ id: 'h1', text: 'Recalculate total after updating quantity.' }],
    editorial: {
      content: 'Call calculateTotal after modifying quantity.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 1
    }
  },
  'fix-shipment-state-transitions': {
    id: 'repo-007',
    slug: 'fix-shipment-state-transitions',
    title: 'Shipment Tracking - State Bug',
    description: 'Shipment status can be set backwards.',
    difficulty: 'medium',
    taskType: 'bug-fix',
    technology: ['Go'],
    language: 'go',
    estimatedTimeMinutes: 30,
    skills: ['Go', 'State Machine'],
    tags: ['backend', 'go', 'bug'],
    companyPattern: 'Logistics',
    repositoryName: 'shipment-tracking',
    files: [
      {
        id: 'f1',
        name: 'shipment_service.go',
        path: 'services/shipment_service.go',
        content: 'package services\n\nimport "errors"\n\ntype Shipment struct {\n\tStatus int // 1: Created, 2: Shipped, 3: Delivered\n}\n\nfunc UpdateStatus(s *Shipment, newStatus int) error {\n\t// BUG: Missing check to prevent backwards transition\n\ts.Status = newStatus\n\treturn nil\n}\n',
        language: 'go',
        type: 'file',
        size: 250
      },
      {
        id: 'f2',
        name: 'shipment_test.go',
        path: 'tests/shipment_test.go',
        content: 'package tests\n\nimport (\n\t"testing"\n\t"../services"\n)\n\nfunc TestCannotMoveBackwards(t *testing.T) {\n\ts := &services.Shipment{Status: 3}\n\terr := services.UpdateStatus(s, 2)\n\tif err == nil {\n\t\tt.Error("Expected error when moving status backwards")\n\t}\n}\n',
        language: 'go',
        type: 'file',
        size: 250
      }
    ],
    editableFiles: ['services/shipment_service.go'],
    readOnlyFiles: ['tests/shipment_test.go'],
    runCommand: 'go run main.go',
    testCommand: 'go test ./...',
    visibleTests: [
      { id: 't1', name: 'TestCannotMoveBackwards', status: 'failed', error: 'Expected error when moving status backwards', timeMs: 5, isPassed: false }
    ],
    hiddenTestCount: 5,
    requirements: ['Prevent backwards status updates.'],
    constraints: [],
    acceptanceCriteria: ['Test passes.'],
    hints: [{ id: 'h1', text: 'Check if newStatus < current Status.' }],
    editorial: {
      content: 'Add `if newStatus < s.Status { return errors.New(...) }`.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 1
    }
  },
  'fix-notification-preference-update': {
    id: 'repo-008',
    slug: 'fix-notification-preference-update',
    title: 'Notification Service - Preference Bug',
    description: 'Notification preferences do not persist correctly.',
    difficulty: 'easy',
    taskType: 'bug-fix',
    technology: ['Python', 'FastAPI'],
    language: 'python',
    estimatedTimeMinutes: 15,
    skills: ['Python', 'CRUD'],
    tags: ['backend', 'python', 'bug'],
    companyPattern: 'Social Media',
    repositoryName: 'notification-service',
    files: [
      {
        id: 'f1',
        name: 'notification_service.py',
        path: 'app/services/notification_service.py',
        content: 'def update_preferences(user_id, prefs):\n    # BUG: Forgot to actually save to database\n    return prefs\n',
        language: 'python',
        type: 'file',
        size: 150
      },
      {
        id: 'f2',
        name: 'test_notifications.py',
        path: 'tests/test_notifications.py',
        content: 'from app.services.notification_service import update_preferences\n\ndef test_update_prefs():\n    # Simulate check for DB save\n    assert False, "Preferences not saved to DB"\n',
        language: 'python',
        type: 'file',
        size: 200
      }
    ],
    editableFiles: ['app/services/notification_service.py'],
    readOnlyFiles: ['tests/test_notifications.py'],
    runCommand: 'uvicorn app.main:app',
    testCommand: 'pytest',
    visibleTests: [
      { id: 't1', name: 'test_update_prefs', status: 'failed', error: 'Preferences not saved to DB', timeMs: 5, isPassed: false }
    ],
    hiddenTestCount: 4,
    requirements: ['Save to DB.'],
    constraints: [],
    acceptanceCriteria: ['Test passes.'],
    hints: [{ id: 'h1', text: 'Call DB save method.' }],
    editorial: {
      content: 'Add database commit.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 1
    }
  },
  'fix-duplicate-review-prevention': {
    id: 'repo-009',
    slug: 'fix-duplicate-review-prevention',
    title: 'Product Review Service - Duplicate Bug',
    description: 'Users can submit multiple reviews for the same product.',
    difficulty: 'medium',
    taskType: 'bug-fix',
    technology: ['Java', 'Spring Boot'],
    language: 'java',
    estimatedTimeMinutes: 30,
    skills: ['Java', 'Validation'],
    tags: ['backend', 'java', 'bug'],
    companyPattern: 'E-commerce',
    repositoryName: 'product-review-service',
    files: [
      {
        id: 'f1',
        name: 'ReviewService.java',
        path: 'src/main/java/com/reviews/service/ReviewService.java',
        content: 'package com.reviews.service;\n\npublic class ReviewService {\n    public void addReview(String userId, String productId) {\n        // BUG: Missing check for existing review by userId for productId\n    }\n}\n',
        language: 'java',
        type: 'file',
        size: 200
      },
      {
        id: 'f2',
        name: 'ReviewDuplicateTest.java',
        path: 'src/test/java/com/reviews/ReviewDuplicateTest.java',
        content: 'package com.reviews;\n\nimport org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.fail;\n\npublic class ReviewDuplicateTest {\n    @Test\n    public void testDuplicateReview() {\n        fail("Duplicate review was allowed");\n    }\n}\n',
        language: 'java',
        type: 'file',
        size: 250
      }
    ],
    editableFiles: ['src/main/java/com/reviews/service/ReviewService.java'],
    readOnlyFiles: ['src/test/java/com/reviews/ReviewDuplicateTest.java'],
    runCommand: 'mvn spring-boot:run',
    testCommand: 'mvn test',
    visibleTests: [
      { id: 't1', name: 'testDuplicateReview', status: 'failed', error: 'Duplicate review was allowed', timeMs: 50, isPassed: false }
    ],
    hiddenTestCount: 6,
    requirements: ['Prevent duplicate reviews.'],
    constraints: [],
    acceptanceCriteria: ['Test passes.'],
    hints: [{ id: 'h1', text: 'Query DB for existing review before saving.' }],
    editorial: {
      content: 'Add check for existing review.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 1
    }
  },
  'fix-concurrent-account-updates': {
    id: 'repo-010',
    slug: 'fix-concurrent-account-updates',
    title: 'Customer Account Service - Concurrency Bug',
    description: 'Concurrent account updates cause lost updates.',
    difficulty: 'hard',
    taskType: 'bug-fix',
    technology: ['Go'],
    language: 'go',
    estimatedTimeMinutes: 45,
    skills: ['Go', 'Concurrency', 'Locks'],
    tags: ['backend', 'go', 'bug'],
    companyPattern: 'Banking',
    repositoryName: 'customer-account-service',
    files: [
      {
        id: 'f1',
        name: 'account_service.go',
        path: 'services/account_service.go',
        content: 'package services\n\ntype Account struct {\n\tBalance int\n}\n\nfunc UpdateBalance(acc *Account, amount int) {\n\t// BUG: Not using mutex/lock for concurrent update\n\tacc.Balance += amount\n}\n',
        language: 'go',
        type: 'file',
        size: 200
      },
      {
        id: 'f2',
        name: 'concurrent_test.go',
        path: 'tests/concurrent_test.go',
        content: 'package tests\n\nimport (\n\t"testing"\n\t"../services"\n)\n\nfunc TestConcurrentUpdates(t *testing.T) {\n\t// Simulate race condition detection\n\tt.Error("Race condition detected in UpdateBalance")\n}\n',
        language: 'go',
        type: 'file',
        size: 200
      }
    ],
    editableFiles: ['services/account_service.go'],
    readOnlyFiles: ['tests/concurrent_test.go'],
    runCommand: 'go run main.go',
    testCommand: 'go test -race ./...',
    visibleTests: [
      { id: 't1', name: 'TestConcurrentUpdates', status: 'failed', error: 'Race condition detected in UpdateBalance', timeMs: 10, isPassed: false }
    ],
    hiddenTestCount: 7,
    requirements: ['Use Mutex for balance updates.'],
    constraints: [],
    acceptanceCriteria: ['Race test passes.'],
    hints: [{ id: 'h1', text: 'Use sync.Mutex.' }],
    editorial: {
      content: 'Add a Mutex to the Account struct and lock around updates.',
      author: 'RepoRank',
      createdAt: '2024-01-01T00:00:00Z',
      estimatedReadTimeMinutes: 1
    }
  }
};
