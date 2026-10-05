/* eslint-disable */

export interface ChallengeMetadata {
  id: number;
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
  requirements: string[];
  constraints: string[];
  acceptanceCriteria: string[];
  hints: { level: number; content: string }[];
  fileCount: number;
  testCount: number;
}

export const challengesMetadata: ChallengeMetadata[] = [
  {
    "id": 1,
    "slug": "fix-broken-order-validation",
    "title": "Fix Broken Order Validation",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 30,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "easy",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "order-service-1",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 2,
    "slug": "repair-customer-lookup",
    "title": "Repair Customer Lookup",
    "description": "The identity and user management service is responsible for handling accounts, profiles, and authentication. A bug has been reported in the user lifecycle management, affecting registration, login, or profile updates. You will need to dig into the auth flow, fix the logic error, and secure the endpoint against invalid data.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Authentication",
      "Data Validation",
      "Security"
    ],
    "tags": [
      "auth",
      "user-management",
      "security",
      "easy",
      "python"
    ],
    "companyPattern": "Uber",
    "repositoryName": "identity-service-2",
    "requirements": [
      "Sanitize and validate user input on all endpoints",
      "Ensure authentication tokens are correctly verified",
      "Properly hash and store sensitive user data if updated"
    ],
    "constraints": [
      "Must be backward compatible with existing user tokens",
      "Changes must comply with GDPR data handling policies"
    ],
    "acceptanceCriteria": [
      "Users can successfully register and update their profiles",
      "Invalid data is rejected with a clear error message",
      "Session state is correctly maintained across requests"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 3,
    "slug": "fix-product-price-calculation",
    "title": "Fix Product Price Calculation",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "node",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "easy",
      "node.js"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "inventory-api-3",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 4,
    "slug": "repair-inventory-decrement",
    "title": "Repair Inventory Decrement",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "easy",
      "java"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "inventory-api-4",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 5,
    "slug": "fix-user-registration-validation",
    "title": "Fix User Registration Validation",
    "description": "The identity and user management service is responsible for handling accounts, profiles, and authentication. A bug has been reported in the user lifecycle management, affecting registration, login, or profile updates. You will need to dig into the auth flow, fix the logic error, and secure the endpoint against invalid data.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Authentication",
      "Data Validation",
      "Security"
    ],
    "tags": [
      "auth",
      "user-management",
      "security",
      "easy",
      "python"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "identity-service-5",
    "requirements": [
      "Sanitize and validate user input on all endpoints",
      "Ensure authentication tokens are correctly verified",
      "Properly hash and store sensitive user data if updated"
    ],
    "constraints": [
      "Must be backward compatible with existing user tokens",
      "Changes must comply with GDPR data handling policies"
    ],
    "acceptanceCriteria": [
      "Users can successfully register and update their profiles",
      "Invalid data is rejected with a clear error message",
      "Session state is correctly maintained across requests"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 6,
    "slug": "repair-pagination-logic",
    "title": "Repair Pagination Logic",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "node",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "node.js"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "core-service-6",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 7,
    "slug": "fix-missing-api-error-response",
    "title": "Fix Missing API Error Response",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "go"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "core-service-7",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 8,
    "slug": "correct-address-update-logic",
    "title": "Correct Address Update Logic",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "core-service-8",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 9,
    "slug": "fix-duplicate-product-detection",
    "title": "Fix Duplicate Product Detection",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "easy",
      "python"
    ],
    "companyPattern": "Uber",
    "repositoryName": "inventory-api-9",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 10,
    "slug": "repair-book-return-handling",
    "title": "Repair Book Return Handling",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "python",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "node.js"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-10",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 11,
    "slug": "fix-cart-item-removal",
    "title": "Fix Cart Item Removal",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 30,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "easy",
      "java"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "order-service-11",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 12,
    "slug": "correct-employee-lookup",
    "title": "Correct Employee Lookup",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "go"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "core-service-12",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 13,
    "slug": "fix-incorrect-date-validation",
    "title": "Fix Incorrect Date Validation",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "python"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "core-service-13",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 14,
    "slug": "repair-basic-cache-lookup",
    "title": "Repair Basic Cache Lookup",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "node",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "node.js"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "core-service-14",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 15,
    "slug": "fix-notification-preference-update",
    "title": "Fix Notification Preference Update",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Feature Implementation",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "python",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "core-service-15",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 16,
    "slug": "repair-missing-database-mapping",
    "title": "Repair Missing Database Mapping",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "python"
    ],
    "companyPattern": "Uber",
    "repositoryName": "core-service-16",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 17,
    "slug": "fix-incorrect-http-status",
    "title": "Fix Incorrect HTTP Status",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "go"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-17",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 18,
    "slug": "correct-coupon-validation",
    "title": "Correct Coupon Validation",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "node",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "node.js"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "core-service-18",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 19,
    "slug": "fix-shipping-address-selection",
    "title": "Fix Shipping Address Selection",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "java"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "core-service-19",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 20,
    "slug": "repair-account-update-endpoint",
    "title": "Repair Account Update Endpoint",
    "description": "The identity and user management service is responsible for handling accounts, profiles, and authentication. A bug has been reported in the user lifecycle management, affecting registration, login, or profile updates. You will need to dig into the auth flow, fix the logic error, and secure the endpoint against invalid data.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Authentication",
      "Data Validation",
      "Security"
    ],
    "tags": [
      "auth",
      "user-management",
      "security",
      "easy",
      "python"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "identity-service-20",
    "requirements": [
      "Sanitize and validate user input on all endpoints",
      "Ensure authentication tokens are correctly verified",
      "Properly hash and store sensitive user data if updated"
    ],
    "constraints": [
      "Must be backward compatible with existing user tokens",
      "Changes must comply with GDPR data handling policies"
    ],
    "acceptanceCriteria": [
      "Users can successfully register and update their profiles",
      "Invalid data is rejected with a clear error message",
      "Session state is correctly maintained across requests"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 21,
    "slug": "fix-search-filter",
    "title": "Fix Search Filter",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "node",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "node.js"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "core-service-21",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 22,
    "slug": "correct-product-availability",
    "title": "Correct Product Availability",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "easy",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "inventory-api-22",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 23,
    "slug": "repair-order-retrieval",
    "title": "Repair Order Retrieval",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 30,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "easy",
      "go"
    ],
    "companyPattern": "Uber",
    "repositoryName": "order-service-23",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 24,
    "slug": "fix-duplicate-review-submission",
    "title": "Fix Duplicate Review Submission",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "python"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-24",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 25,
    "slug": "correct-basic-rest-validation",
    "title": "Correct Basic REST Validation",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "node",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "easy",
      "node.js"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "core-service-25",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 8,
    "testCount": 10
  },
  {
    "id": 26,
    "slug": "fix-order-state-machine",
    "title": "Fix Order State Machine",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "medium",
      "java"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "order-service-26",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 27,
    "slug": "repair-inventory-reservation",
    "title": "Repair Inventory Reservation",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "medium",
      "python"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "inventory-api-27",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 28,
    "slug": "fix-payment-retry-logic",
    "title": "Fix Payment Retry Logic",
    "description": "Our payment gateway integration handles thousands of transactions per minute. Recently, we've seen duplicate charges and failed payment retries getting stuck in an infinite loop. You must implement or fix the payment retry mechanism, ensuring idempotency and consistent state between our system and the external provider.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "node",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Idempotency",
      "External Integrations",
      "Retry Logic"
    ],
    "tags": [
      "fintech",
      "payments",
      "resilience",
      "medium",
      "node.js"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "payment-gateway-28",
    "requirements": [
      "Ensure payment endpoints are strictly idempotent",
      "Implement exponential backoff for failed network calls",
      "Synchronize local payment status with external gateway state"
    ],
    "constraints": [
      "Idempotency keys must be cached for at least 24 hours",
      "External API calls must have a strict timeout of 5 seconds"
    ],
    "acceptanceCriteria": [
      "Duplicate requests with the same idempotency key return the original result",
      "Failed payments transition to 'Failed' state after max retries",
      "Network timeouts do not leave the system in an inconsistent state"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 29,
    "slug": "implement-order-cancellation",
    "title": "Implement Order Cancellation",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "medium",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "order-service-29",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 30,
    "slug": "fix-cart-synchronization",
    "title": "Fix Cart Synchronization",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "node",
    "estimatedTimeMinutes": 60,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "medium",
      "python"
    ],
    "companyPattern": "Uber",
    "repositoryName": "order-service-30",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 31,
    "slug": "repair-warehouse-allocation",
    "title": "Repair Warehouse Allocation",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "medium",
      "go"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "inventory-api-31",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 32,
    "slug": "implement-product-search-filters",
    "title": "Implement Product Search Filters",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "medium",
      "node.js"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "inventory-api-32",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 33,
    "slug": "fix-customer-service-pagination",
    "title": "Fix Customer Service Pagination",
    "description": "The identity and user management service is responsible for handling accounts, profiles, and authentication. A bug has been reported in the user lifecycle management, affecting registration, login, or profile updates. You will need to dig into the auth flow, fix the logic error, and secure the endpoint against invalid data.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Authentication",
      "Data Validation",
      "Security"
    ],
    "tags": [
      "auth",
      "user-management",
      "security",
      "medium",
      "java"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "identity-service-33",
    "requirements": [
      "Sanitize and validate user input on all endpoints",
      "Ensure authentication tokens are correctly verified",
      "Properly hash and store sensitive user data if updated"
    ],
    "constraints": [
      "Must be backward compatible with existing user tokens",
      "Changes must comply with GDPR data handling policies"
    ],
    "acceptanceCriteria": [
      "Users can successfully register and update their profiles",
      "Invalid data is rejected with a clear error message",
      "Session state is correctly maintained across requests"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 34,
    "slug": "repair-jwt-authorization",
    "title": "Repair JWT Authorization",
    "description": "The identity and user management service is responsible for handling accounts, profiles, and authentication. A bug has been reported in the user lifecycle management, affecting registration, login, or profile updates. You will need to dig into the auth flow, fix the logic error, and secure the endpoint against invalid data.",
    "difficulty": "medium",
    "taskType": "Debugging",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Authentication",
      "Data Validation",
      "Security"
    ],
    "tags": [
      "auth",
      "user-management",
      "security",
      "medium",
      "python"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "identity-service-34",
    "requirements": [
      "Sanitize and validate user input on all endpoints",
      "Ensure authentication tokens are correctly verified",
      "Properly hash and store sensitive user data if updated"
    ],
    "constraints": [
      "Must be backward compatible with existing user tokens",
      "Changes must comply with GDPR data handling policies"
    ],
    "acceptanceCriteria": [
      "Users can successfully register and update their profiles",
      "Invalid data is rejected with a clear error message",
      "Session state is correctly maintained across requests"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 35,
    "slug": "implement-role-based-access",
    "title": "Implement Role-Based Access",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "node.js"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "core-service-35",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 36,
    "slug": "fix-repository-transaction-bug",
    "title": "Fix Repository Transaction Bug",
    "description": "Our payment gateway integration handles thousands of transactions per minute. Recently, we've seen duplicate charges and failed payment retries getting stuck in an infinite loop. You must implement or fix the payment retry mechanism, ensuring idempotency and consistent state between our system and the external provider.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Idempotency",
      "External Integrations",
      "Retry Logic"
    ],
    "tags": [
      "fintech",
      "payments",
      "resilience",
      "medium",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "payment-gateway-36",
    "requirements": [
      "Ensure payment endpoints are strictly idempotent",
      "Implement exponential backoff for failed network calls",
      "Synchronize local payment status with external gateway state"
    ],
    "constraints": [
      "Idempotency keys must be cached for at least 24 hours",
      "External API calls must have a strict timeout of 5 seconds"
    ],
    "acceptanceCriteria": [
      "Duplicate requests with the same idempotency key return the original result",
      "Failed payments transition to 'Failed' state after max retries",
      "Network timeouts do not leave the system in an inconsistent state"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 37,
    "slug": "repair-duplicate-request-handling",
    "title": "Repair Duplicate Request Handling",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "go"
    ],
    "companyPattern": "Uber",
    "repositoryName": "core-service-37",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 38,
    "slug": "implement-idempotent-payment-api",
    "title": "Implement Idempotent Payment API",
    "description": "Our payment gateway integration handles thousands of transactions per minute. Recently, we've seen duplicate charges and failed payment retries getting stuck in an infinite loop. You must implement or fix the payment retry mechanism, ensuring idempotency and consistent state between our system and the external provider.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Idempotency",
      "External Integrations",
      "Retry Logic"
    ],
    "tags": [
      "fintech",
      "payments",
      "resilience",
      "medium",
      "java"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "payment-gateway-38",
    "requirements": [
      "Ensure payment endpoints are strictly idempotent",
      "Implement exponential backoff for failed network calls",
      "Synchronize local payment status with external gateway state"
    ],
    "constraints": [
      "Idempotency keys must be cached for at least 24 hours",
      "External API calls must have a strict timeout of 5 seconds"
    ],
    "acceptanceCriteria": [
      "Duplicate requests with the same idempotency key return the original result",
      "Failed payments transition to 'Failed' state after max retries",
      "Network timeouts do not leave the system in an inconsistent state"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 39,
    "slug": "fix-shipment-state-transitions",
    "title": "Fix Shipment State Transitions",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "go",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "python"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "core-service-39",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 40,
    "slug": "implement-order-history",
    "title": "Implement Order History",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "medium",
      "node.js"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "order-service-40",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 41,
    "slug": "repair-redis-cache-invalidation",
    "title": "Repair Redis Cache Invalidation",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "java"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "core-service-41",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 42,
    "slug": "fix-database-n-1-query",
    "title": "Fix Database N+1 Query",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Performance",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "python"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "core-service-42",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 43,
    "slug": "implement-api-pagination",
    "title": "Implement API Pagination",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "go"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "core-service-43",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 44,
    "slug": "repair-failed-background-job",
    "title": "Repair Failed Background Job",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Debugging",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "node.js"
    ],
    "companyPattern": "Uber",
    "repositoryName": "core-service-44",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 45,
    "slug": "fix-notification-retry",
    "title": "Fix Notification Retry",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "java"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-45",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 46,
    "slug": "implement-inventory-restocking",
    "title": "Implement Inventory Restocking",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "medium",
      "python"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "inventory-api-46",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 47,
    "slug": "repair-user-session-handling",
    "title": "Repair User Session Handling",
    "description": "The identity and user management service is responsible for handling accounts, profiles, and authentication. A bug has been reported in the user lifecycle management, affecting registration, login, or profile updates. You will need to dig into the auth flow, fix the logic error, and secure the endpoint against invalid data.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Authentication",
      "Data Validation",
      "Security"
    ],
    "tags": [
      "auth",
      "user-management",
      "security",
      "medium",
      "node.js"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "identity-service-47",
    "requirements": [
      "Sanitize and validate user input on all endpoints",
      "Ensure authentication tokens are correctly verified",
      "Properly hash and store sensitive user data if updated"
    ],
    "constraints": [
      "Must be backward compatible with existing user tokens",
      "Changes must comply with GDPR data handling policies"
    ],
    "acceptanceCriteria": [
      "Users can successfully register and update their profiles",
      "Invalid data is rejected with a clear error message",
      "Session state is correctly maintained across requests"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 48,
    "slug": "fix-product-recommendation-api",
    "title": "Fix Product Recommendation API",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "medium",
      "java"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "inventory-api-48",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 49,
    "slug": "implement-review-moderation",
    "title": "Implement Review Moderation",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "python"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "core-service-49",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 50,
    "slug": "repair-checkout-workflow",
    "title": "Repair Checkout Workflow",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "medium",
    "taskType": "Debugging",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "medium",
      "node.js"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "order-service-50",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 51,
    "slug": "fix-concurrent-inventory-updates",
    "title": "Fix Concurrent Inventory Updates",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "medium",
    "taskType": "Concurrency",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "medium",
      "java"
    ],
    "companyPattern": "Uber",
    "repositoryName": "inventory-api-51",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 52,
    "slug": "implement-coupon-usage-limits",
    "title": "Implement Coupon Usage Limits",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "python"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-52",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 53,
    "slug": "repair-event-processing",
    "title": "Repair Event Processing",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Debugging",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "go"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "core-service-53",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 54,
    "slug": "fix-search-index-synchronization",
    "title": "Fix Search Index Synchronization",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "node.js"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "core-service-54",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 55,
    "slug": "implement-audit-logging",
    "title": "Implement Audit Logging",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "java"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "core-service-55",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 56,
    "slug": "repair-service-to-service-request",
    "title": "Repair Service-to-Service Request",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Debugging",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "python"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "core-service-56",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 57,
    "slug": "fix-incorrect-transaction-boundary",
    "title": "Fix Incorrect Transaction Boundary",
    "description": "Our payment gateway integration handles thousands of transactions per minute. Recently, we've seen duplicate charges and failed payment retries getting stuck in an infinite loop. You must implement or fix the payment retry mechanism, ensuring idempotency and consistent state between our system and the external provider.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Idempotency",
      "External Integrations",
      "Retry Logic"
    ],
    "tags": [
      "fintech",
      "payments",
      "resilience",
      "medium",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "payment-gateway-57",
    "requirements": [
      "Ensure payment endpoints are strictly idempotent",
      "Implement exponential backoff for failed network calls",
      "Synchronize local payment status with external gateway state"
    ],
    "constraints": [
      "Idempotency keys must be cached for at least 24 hours",
      "External API calls must have a strict timeout of 5 seconds"
    ],
    "acceptanceCriteria": [
      "Duplicate requests with the same idempotency key return the original result",
      "Failed payments transition to 'Failed' state after max retries",
      "Network timeouts do not leave the system in an inconsistent state"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 58,
    "slug": "implement-soft-delete",
    "title": "Implement Soft Delete",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "go"
    ],
    "companyPattern": "Uber",
    "repositoryName": "core-service-58",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 59,
    "slug": "repair-database-migration",
    "title": "Repair Database Migration",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Database Fix",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "node.js"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-59",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 60,
    "slug": "implement-order-filtering",
    "title": "Implement Order Filtering",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "medium",
      "python"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "order-service-60",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 61,
    "slug": "fix-warehouse-shipment-assignment",
    "title": "Fix Warehouse Shipment Assignment",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "medium",
      "java"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "inventory-api-61",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 62,
    "slug": "repair-customer-account-locking",
    "title": "Repair Customer Account Locking",
    "description": "The identity and user management service is responsible for handling accounts, profiles, and authentication. A bug has been reported in the user lifecycle management, affecting registration, login, or profile updates. You will need to dig into the auth flow, fix the logic error, and secure the endpoint against invalid data.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Authentication",
      "Data Validation",
      "Security"
    ],
    "tags": [
      "auth",
      "user-management",
      "security",
      "medium",
      "go"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "identity-service-62",
    "requirements": [
      "Sanitize and validate user input on all endpoints",
      "Ensure authentication tokens are correctly verified",
      "Properly hash and store sensitive user data if updated"
    ],
    "constraints": [
      "Must be backward compatible with existing user tokens",
      "Changes must comply with GDPR data handling policies"
    ],
    "acceptanceCriteria": [
      "Users can successfully register and update their profiles",
      "Invalid data is rejected with a clear error message",
      "Session state is correctly maintained across requests"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 63,
    "slug": "implement-bulk-product-import",
    "title": "Implement Bulk Product Import",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "medium",
      "node.js"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "inventory-api-63",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 64,
    "slug": "fix-payment-status-synchronization",
    "title": "Fix Payment Status Synchronization",
    "description": "Our payment gateway integration handles thousands of transactions per minute. Recently, we've seen duplicate charges and failed payment retries getting stuck in an infinite loop. You must implement or fix the payment retry mechanism, ensuring idempotency and consistent state between our system and the external provider.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Idempotency",
      "External Integrations",
      "Retry Logic"
    ],
    "tags": [
      "fintech",
      "payments",
      "resilience",
      "medium",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "payment-gateway-64",
    "requirements": [
      "Ensure payment endpoints are strictly idempotent",
      "Implement exponential backoff for failed network calls",
      "Synchronize local payment status with external gateway state"
    ],
    "constraints": [
      "Idempotency keys must be cached for at least 24 hours",
      "External API calls must have a strict timeout of 5 seconds"
    ],
    "acceptanceCriteria": [
      "Duplicate requests with the same idempotency key return the original result",
      "Failed payments transition to 'Failed' state after max retries",
      "Network timeouts do not leave the system in an inconsistent state"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 65,
    "slug": "implement-order-retry-processing",
    "title": "Implement Order Retry Processing",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "medium",
      "python"
    ],
    "companyPattern": "Uber",
    "repositoryName": "order-service-65",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 66,
    "slug": "repair-api-timeout-handling",
    "title": "Repair API Timeout Handling",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "go"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-66",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 67,
    "slug": "fix-cache-stampede",
    "title": "Fix Cache Stampede",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Performance",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "java"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "core-service-67",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 68,
    "slug": "implement-request-validation-middleware",
    "title": "Implement Request Validation Middleware",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Feature Implementation",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "node.js"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "core-service-68",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 69,
    "slug": "repair-database-connection-handling",
    "title": "Repair Database Connection Handling",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Database Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "python"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "core-service-69",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 70,
    "slug": "fix-scheduled-job-logic",
    "title": "Fix Scheduled Job Logic",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "medium",
      "java"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "core-service-70",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 15,
    "testCount": 25
  },
  {
    "id": 71,
    "slug": "debug-distributed-order-processing",
    "title": "Debug Distributed Order Processing",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "hard",
    "taskType": "Debugging",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 120,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "hard",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "order-service-71",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 72,
    "slug": "fix-race-condition-in-inventory",
    "title": "Fix Race Condition in Inventory",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "hard",
    "taskType": "Concurrency",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "hard",
      "python"
    ],
    "companyPattern": "Uber",
    "repositoryName": "inventory-api-72",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 73,
    "slug": "implement-idempotent-event-consumer",
    "title": "Implement Idempotent Event Consumer",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Feature Implementation",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "node",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "java"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-73",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 74,
    "slug": "repair-payment-order-consistency",
    "title": "Repair Payment/Order Consistency",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "hard",
    "taskType": "Debugging",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 120,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "hard",
      "node.js"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "order-service-74",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 75,
    "slug": "implement-retry-with-backoff",
    "title": "Implement Retry with Backoff",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Feature Implementation",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "go"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "core-service-75",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 76,
    "slug": "fix-concurrent-cart-updates",
    "title": "Fix Concurrent Cart Updates",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "hard",
    "taskType": "Concurrency",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 120,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "hard",
      "java"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "order-service-76",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 77,
    "slug": "debug-deadlock-in-transaction-flow",
    "title": "Debug Deadlock in Transaction Flow",
    "description": "Our payment gateway integration handles thousands of transactions per minute. Recently, we've seen duplicate charges and failed payment retries getting stuck in an infinite loop. You must implement or fix the payment retry mechanism, ensuring idempotency and consistent state between our system and the external provider.",
    "difficulty": "hard",
    "taskType": "Debugging",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Idempotency",
      "External Integrations",
      "Retry Logic"
    ],
    "tags": [
      "fintech",
      "payments",
      "resilience",
      "hard",
      "python"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "payment-gateway-77",
    "requirements": [
      "Ensure payment endpoints are strictly idempotent",
      "Implement exponential backoff for failed network calls",
      "Synchronize local payment status with external gateway state"
    ],
    "constraints": [
      "Idempotency keys must be cached for at least 24 hours",
      "External API calls must have a strict timeout of 5 seconds"
    ],
    "acceptanceCriteria": [
      "Duplicate requests with the same idempotency key return the original result",
      "Failed payments transition to 'Failed' state after max retries",
      "Network timeouts do not leave the system in an inconsistent state"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 78,
    "slug": "repair-distributed-cache-invalidation",
    "title": "Repair Distributed Cache Invalidation",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "java"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "core-service-78",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 79,
    "slug": "implement-outbox-style-event-publishing",
    "title": "Implement Outbox-Style Event Publishing",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Feature Implementation",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "node.js"
    ],
    "companyPattern": "Uber",
    "repositoryName": "core-service-79",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 80,
    "slug": "fix-duplicate-message-processing",
    "title": "Fix Duplicate Message Processing",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "go"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-80",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 81,
    "slug": "debug-shipment-allocation-under-load",
    "title": "Debug Shipment Allocation Under Load",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Debugging",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "java"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "core-service-81",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 82,
    "slug": "implement-rate-limiting-middleware",
    "title": "Implement Rate Limiting Middleware",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Feature Implementation",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "python"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "core-service-82",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 83,
    "slug": "repair-multi-service-authentication",
    "title": "Repair Multi-Service Authentication",
    "description": "The identity and user management service is responsible for handling accounts, profiles, and authentication. A bug has been reported in the user lifecycle management, affecting registration, login, or profile updates. You will need to dig into the auth flow, fix the logic error, and secure the endpoint against invalid data.",
    "difficulty": "hard",
    "taskType": "Debugging",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Authentication",
      "Data Validation",
      "Security"
    ],
    "tags": [
      "auth",
      "user-management",
      "security",
      "hard",
      "node.js"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "identity-service-83",
    "requirements": [
      "Sanitize and validate user input on all endpoints",
      "Ensure authentication tokens are correctly verified",
      "Properly hash and store sensitive user data if updated"
    ],
    "constraints": [
      "Must be backward compatible with existing user tokens",
      "Changes must comply with GDPR data handling policies"
    ],
    "acceptanceCriteria": [
      "Users can successfully register and update their profiles",
      "Invalid data is rejected with a clear error message",
      "Session state is correctly maintained across requests"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 84,
    "slug": "fix-event-ordering-issue",
    "title": "Fix Event Ordering Issue",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "hard",
    "taskType": "Bug Fix",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 120,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "hard",
      "java"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "order-service-84",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 85,
    "slug": "implement-resilient-payment-workflow",
    "title": "Implement Resilient Payment Workflow",
    "description": "Our payment gateway integration handles thousands of transactions per minute. Recently, we've seen duplicate charges and failed payment retries getting stuck in an infinite loop. You must implement or fix the payment retry mechanism, ensuring idempotency and consistent state between our system and the external provider.",
    "difficulty": "hard",
    "taskType": "Feature Implementation",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Idempotency",
      "External Integrations",
      "Retry Logic"
    ],
    "tags": [
      "fintech",
      "payments",
      "resilience",
      "hard",
      "go"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "payment-gateway-85",
    "requirements": [
      "Ensure payment endpoints are strictly idempotent",
      "Implement exponential backoff for failed network calls",
      "Synchronize local payment status with external gateway state"
    ],
    "constraints": [
      "Idempotency keys must be cached for at least 24 hours",
      "External API calls must have a strict timeout of 5 seconds"
    ],
    "acceptanceCriteria": [
      "Duplicate requests with the same idempotency key return the original result",
      "Failed payments transition to 'Failed' state after max retries",
      "Network timeouts do not leave the system in an inconsistent state"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 86,
    "slug": "debug-database-isolation-issue",
    "title": "Debug Database Isolation Issue",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Debugging",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "java"
    ],
    "companyPattern": "Uber",
    "repositoryName": "core-service-86",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 87,
    "slug": "repair-worker-queue-processing",
    "title": "Repair Worker Queue Processing",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Bug Fix",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "python"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-87",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 88,
    "slug": "implement-distributed-locking",
    "title": "Implement Distributed Locking",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Feature Implementation",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "node.js"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "core-service-88",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 89,
    "slug": "fix-high-latency-product-search",
    "title": "Fix High-Latency Product Search",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "hard",
    "taskType": "Performance",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "hard",
      "java"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "inventory-api-89",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 90,
    "slug": "repair-partial-failure-recovery",
    "title": "Repair Partial Failure Recovery",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "go"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "core-service-90",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 91,
    "slug": "implement-consistent-audit-trail",
    "title": "Implement Consistent Audit Trail",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Feature Implementation",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "java"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "core-service-91",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 92,
    "slug": "debug-cache-data-mismatch",
    "title": "Debug Cache/Data Mismatch",
    "description": "This Python microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Debugging",
    "technology": [
      "Python",
      "FastAPI"
    ],
    "language": "Python",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "python"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "core-service-92",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 93,
    "slug": "repair-concurrent-reservation-system",
    "title": "Repair Concurrent Reservation System",
    "description": "This Node.js microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Concurrency",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "node.js"
    ],
    "companyPattern": "Uber",
    "repositoryName": "core-service-93",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 94,
    "slug": "implement-safe-batch-processing",
    "title": "Implement Safe Batch Processing",
    "description": "This Java microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Feature Implementation",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "java"
    ],
    "companyPattern": "Shopify",
    "repositoryName": "core-service-94",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 95,
    "slug": "fix-service-retry-storm",
    "title": "Fix Service Retry Storm",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "hard",
    "taskType": "Bug Fix",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 120,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "hard",
      "go"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "core-service-95",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 25,
    "testCount": 40
  },
  {
    "id": 96,
    "slug": "repair-distributed-transaction-workflow",
    "title": "Repair Distributed Transaction Workflow",
    "description": "Our payment gateway integration handles thousands of transactions per minute. Recently, we've seen duplicate charges and failed payment retries getting stuck in an infinite loop. You must implement or fix the payment retry mechanism, ensuring idempotency and consistent state between our system and the external provider.",
    "difficulty": "expert",
    "taskType": "Debugging",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 180,
    "skills": [
      "Idempotency",
      "External Integrations",
      "Retry Logic"
    ],
    "tags": [
      "fintech",
      "payments",
      "resilience",
      "expert",
      "java"
    ],
    "companyPattern": "Airbnb",
    "repositoryName": "payment-gateway-96",
    "requirements": [
      "Ensure payment endpoints are strictly idempotent",
      "Implement exponential backoff for failed network calls",
      "Synchronize local payment status with external gateway state"
    ],
    "constraints": [
      "Idempotency keys must be cached for at least 24 hours",
      "External API calls must have a strict timeout of 5 seconds"
    ],
    "acceptanceCriteria": [
      "Duplicate requests with the same idempotency key return the original result",
      "Failed payments transition to 'Failed' state after max retries",
      "Network timeouts do not leave the system in an inconsistent state"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 35,
    "testCount": 50
  },
  {
    "id": 97,
    "slug": "debug-event-driven-order-pipeline",
    "title": "Debug Event-Driven Order Pipeline",
    "description": "In our e-commerce platform, the order management system relies on strict validation and state transitions. Currently, edge cases in order processing are causing dropped requests or invalid states. Your task is to investigate the order flow, correct the validation logic or state machine, and ensure data integrity is preserved during concurrent operations.",
    "difficulty": "expert",
    "taskType": "Debugging",
    "technology": [
      "Go"
    ],
    "language": "go",
    "estimatedTimeMinutes": 180,
    "skills": [
      "State Machines",
      "Transaction Management",
      "Data Validation"
    ],
    "tags": [
      "ecommerce",
      "order-management",
      "backend",
      "expert",
      "python"
    ],
    "companyPattern": "Twilio",
    "repositoryName": "order-service-97",
    "requirements": [
      "Validate all order line items against current catalog availability",
      "Ensure order state transitions adhere strictly to the allowed state machine pathways",
      "Reject malformed or incomplete order payloads with appropriate error codes"
    ],
    "constraints": [
      "Must not break existing downstream webhooks",
      "Operation must complete within a single database transaction"
    ],
    "acceptanceCriteria": [
      "Order creation succeeds with valid payload",
      "Invalid states are rejected with 400 Bad Request",
      "State transitions from 'Pending' to 'Shipped' work correctly"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 35,
    "testCount": 50
  },
  {
    "id": 98,
    "slug": "implement-fault-tolerant-inventory-reservation",
    "title": "Implement Fault-Tolerant Inventory Reservation",
    "description": "The warehouse inventory system manages stock levels across multiple fulfillment centers. We are observing discrepancies where stock goes below zero or fails to decrement correctly under load. You need to repair the reservation or decrement logic, handling concurrent updates safely without degrading performance.",
    "difficulty": "expert",
    "taskType": "Feature Implementation",
    "technology": [
      "Java",
      "Spring Boot"
    ],
    "language": "Java",
    "estimatedTimeMinutes": 180,
    "skills": [
      "Concurrency",
      "Database Locks",
      "Race Conditions"
    ],
    "tags": [
      "warehouse",
      "inventory",
      "concurrency",
      "expert",
      "java"
    ],
    "companyPattern": "Amazon",
    "repositoryName": "inventory-api-98",
    "requirements": [
      "Implement atomic decrements for stock levels",
      "Validate stock availability before confirming reservation",
      "Handle race conditions during high-volume sales events"
    ],
    "constraints": [
      "Must use optimistic locking or database-level constraints",
      "Cannot introduce deadlocks into the inventory tables"
    ],
    "acceptanceCriteria": [
      "Stock never falls below 0",
      "Concurrent reservation requests are processed sequentially or rejected gracefully",
      "Logs accurately reflect inventory changes"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 35,
    "testCount": 50
  },
  {
    "id": 99,
    "slug": "repair-high-concurrency-payment-processing",
    "title": "Repair High-Concurrency Payment Processing",
    "description": "Our payment gateway integration handles thousands of transactions per minute. Recently, we've seen duplicate charges and failed payment retries getting stuck in an infinite loop. You must implement or fix the payment retry mechanism, ensuring idempotency and consistent state between our system and the external provider.",
    "difficulty": "expert",
    "taskType": "Concurrency",
    "technology": [
      "Node.js",
      "Express"
    ],
    "language": "Node.js",
    "estimatedTimeMinutes": 180,
    "skills": [
      "Idempotency",
      "External Integrations",
      "Retry Logic"
    ],
    "tags": [
      "fintech",
      "payments",
      "resilience",
      "expert",
      "node.js"
    ],
    "companyPattern": "Stripe",
    "repositoryName": "payment-gateway-99",
    "requirements": [
      "Ensure payment endpoints are strictly idempotent",
      "Implement exponential backoff for failed network calls",
      "Synchronize local payment status with external gateway state"
    ],
    "constraints": [
      "Idempotency keys must be cached for at least 24 hours",
      "External API calls must have a strict timeout of 5 seconds"
    ],
    "acceptanceCriteria": [
      "Duplicate requests with the same idempotency key return the original result",
      "Failed payments transition to 'Failed' state after max retries",
      "Network timeouts do not leave the system in an inconsistent state"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 35,
    "testCount": 50
  },
  {
    "id": 100,
    "slug": "debug-multi-service-consistency-failure",
    "title": "Debug Multi-Service Consistency Failure",
    "description": "This Go microservice handles critical business operations but has recently exhibited anomalous behavior under specific conditions. Whether it's a data mismatch, a performance bottleneck, or a pure logic flaw, your objective is to trace the execution path, isolate the defect, and apply a robust fix.",
    "difficulty": "expert",
    "taskType": "Debugging",
    "technology": [
      "Go"
    ],
    "language": "Go",
    "estimatedTimeMinutes": 180,
    "skills": [
      "Debugging",
      "Root Cause Analysis",
      "Unit Testing"
    ],
    "tags": [
      "backend",
      "bug-fix",
      "maintenance",
      "expert",
      "go"
    ],
    "companyPattern": "Uber",
    "repositoryName": "core-service-100",
    "requirements": [
      "Identify the root cause of the logical defect",
      "Apply a fix that addresses the specific failure case",
      "Write regression tests to prevent future occurrences"
    ],
    "constraints": [
      "Avoid massive refactoring; focus on fixing the bug",
      "Maintain the existing API contract"
    ],
    "acceptanceCriteria": [
      "The specific edge case is handled correctly",
      "All existing unit tests pass",
      "Performance remains stable or improves"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Review the recent changes in the main controller or service layer."
      },
      {
        "level": 2,
        "content": "Pay attention to how state or data is being validated before database persistence."
      },
      {
        "level": 3,
        "content": "Look specifically for missing null checks or unhandled edge cases in the data flow."
      }
    ],
    "fileCount": 35,
    "testCount": 50
  },
  {
    "id": 101,
    "slug": "cpp-virtual-destructor-fix",
    "title": "Missing Virtual Destructor",
    "description": "Fix undefined behavior by adding a virtual destructor to a polymorphic base class.",
    "difficulty": "easy",
    "taskType": "Bug Fix",
    "technology": [
      "C++",
      "OOP"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 15,
    "skills": [
      "Memory Management",
      "Polymorphism"
    ],
    "tags": [
      "c++",
      "bugfix",
      "memory"
    ],
    "companyPattern": "Ubisoft",
    "repositoryName": "cpp-virtual-destructor-fix",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Ensure derived class destructors are called"
    ],
    "constraints": [
      "Must use standard C++17"
    ],
    "acceptanceCriteria": [
      "No memory leaks on deletion through base pointer"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Look at the base class destructor."
      }
    ]
  },
  {
    "id": 102,
    "slug": "cpp-vector-iterator-invalidation",
    "title": "Vector Iterator Invalidation",
    "description": "Fix a crash caused by pushing to a vector while iterating over it.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "C++",
      "STL"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 20,
    "skills": [
      "STL",
      "Iterators"
    ],
    "tags": [
      "c++",
      "stl",
      "crash"
    ],
    "companyPattern": "Bloomberg",
    "repositoryName": "cpp-vector-iterator-invalidation",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Safely add elements while processing a vector"
    ],
    "constraints": [
      "Standard C++17"
    ],
    "acceptanceCriteria": [
      "Program does not crash on vector resize"
    ],
    "hints": [
      {
        "level": 1,
        "content": "push_back can reallocate memory and invalidate iterators."
      }
    ]
  },
  {
    "id": 103,
    "slug": "cpp-smart-pointer-migration",
    "title": "Migrate to Smart Pointers",
    "description": "Refactor a legacy codebase to use std::unique_ptr instead of raw new/delete.",
    "difficulty": "medium",
    "taskType": "Refactoring",
    "technology": [
      "C++",
      "Modern C++"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 25,
    "skills": [
      "Smart Pointers",
      "RAII"
    ],
    "tags": [
      "c++",
      "modernization",
      "memory"
    ],
    "companyPattern": "Tesla",
    "repositoryName": "cpp-smart-pointer-migration",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Replace all raw pointers with std::unique_ptr"
    ],
    "constraints": [
      "Must use std::make_unique"
    ],
    "acceptanceCriteria": [
      "No manual delete calls remain",
      "No memory leaks"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Include <memory>."
      }
    ]
  },
  {
    "id": 104,
    "slug": "cpp-string-view-lifetime",
    "title": "Dangling String View",
    "description": "Fix a bug where a std::string_view outlives the std::string it points to.",
    "difficulty": "hard",
    "taskType": "Bug Fix",
    "technology": [
      "C++",
      "Modern C++"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 30,
    "skills": [
      "Lifetimes",
      "String View"
    ],
    "tags": [
      "c++",
      "memory",
      "undefined-behavior"
    ],
    "companyPattern": "Google",
    "repositoryName": "cpp-string-view-lifetime",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Ensure the underlying string data remains valid"
    ],
    "constraints": [
      "Standard C++17"
    ],
    "acceptanceCriteria": [
      "No garbage output when printing the string view"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Are you returning a string_view to a local temporary string?"
      }
    ]
  },
  {
    "id": 105,
    "slug": "cpp-thread-safe-queue",
    "title": "Thread-Safe Message Queue",
    "description": "Implement a thread-safe MPMC queue using std::mutex and std::condition_variable.",
    "difficulty": "hard",
    "taskType": "Feature",
    "technology": [
      "C++",
      "Concurrency"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 45,
    "skills": [
      "Multithreading",
      "Synchronization"
    ],
    "tags": [
      "c++",
      "threads",
      "concurrency"
    ],
    "companyPattern": "NVIDIA",
    "repositoryName": "cpp-thread-safe-queue",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Implement push() and pop() safely"
    ],
    "constraints": [
      "Must block on pop() if queue is empty"
    ],
    "acceptanceCriteria": [
      "Multiple producers and consumers run without data races"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Use std::unique_lock with your condition variable."
      }
    ]
  },
  {
    "id": 106,
    "slug": "cpp-optimize-matrix-mult",
    "title": "Optimize Matrix Cache Locality",
    "description": "Optimize a slow matrix multiplication by fixing the loop order to respect row-major cache lines.",
    "difficulty": "hard",
    "taskType": "Optimization",
    "technology": [
      "C++",
      "Performance"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 30,
    "skills": [
      "CPU Cache",
      "Optimization"
    ],
    "tags": [
      "c++",
      "performance",
      "algorithms"
    ],
    "companyPattern": "Jane Street",
    "repositoryName": "cpp-optimize-matrix-mult",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Improve execution speed significantly"
    ],
    "constraints": [
      "Do not use external math libraries"
    ],
    "acceptanceCriteria": [
      "Execution time drops by at least 5x compared to naive ikj"
    ],
    "hints": [
      {
        "level": 1,
        "content": "C++ arrays are row-major. Iterate rows in the inner loop."
      }
    ]
  },
  {
    "id": 107,
    "slug": "cpp-deadlock-prevention",
    "title": "Fix Lock Ordering Deadlock",
    "description": "Fix a deadlock scenario where two threads acquire mutexes in reverse order.",
    "difficulty": "expert",
    "taskType": "Bug Fix",
    "technology": [
      "C++",
      "Concurrency"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 40,
    "skills": [
      "Deadlocks",
      "std::scoped_lock"
    ],
    "tags": [
      "c++",
      "concurrency",
      "deadlock"
    ],
    "companyPattern": "Meta",
    "repositoryName": "cpp-deadlock-prevention",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Ensure both accounts can transfer money simultaneously"
    ],
    "constraints": [
      "Use std::scoped_lock or std::lock"
    ],
    "acceptanceCriteria": [
      "Program completes without hanging"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Acquiring lock A then B in thread 1, and B then A in thread 2 causes a deadlock."
      }
    ]
  },
  {
    "id": 108,
    "slug": "cpp-custom-allocator-segfault",
    "title": "Custom Memory Pool Crash",
    "description": "Debug a segmentation fault in a custom memory pool allocator.",
    "difficulty": "expert",
    "taskType": "Bug Fix",
    "technology": [
      "C++",
      "Memory"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 50,
    "skills": [
      "Memory Allocation",
      "Pointers"
    ],
    "tags": [
      "c++",
      "memory-management",
      "low-level"
    ],
    "companyPattern": "Electronic Arts",
    "repositoryName": "cpp-custom-allocator-segfault",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Fix pointer arithmetic for chunk alignment"
    ],
    "constraints": [
      "No standard allocators allowed in the pool"
    ],
    "acceptanceCriteria": [
      "Pool allocates and deallocates without segfaulting"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Check if you are casting to uint8_t* before pointer addition."
      }
    ]
  },
  {
    "id": 109,
    "slug": "cpp-rule-of-five",
    "title": "Rule of Five Violation",
    "description": "Fix double-free crashes by properly implementing the Rule of Five in a RAII wrapper.",
    "difficulty": "medium",
    "taskType": "Bug Fix",
    "technology": [
      "C++",
      "OOP"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 20,
    "skills": [
      "RAII",
      "Move Semantics"
    ],
    "tags": [
      "c++",
      "raii",
      "memory"
    ],
    "companyPattern": "Apple",
    "repositoryName": "cpp-rule-of-five",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Implement copy and move constructors/assignments safely"
    ],
    "constraints": [
      "Standard C++17"
    ],
    "acceptanceCriteria": [
      "Vector reallocations of the object do not cause double frees"
    ],
    "hints": [
      {
        "level": 1,
        "content": "If you write a destructor, you need copy/move constructors and assignment operators."
      }
    ]
  },
  {
    "id": 110,
    "slug": "cpp-race-condition-atomics",
    "title": "Data Race to Atomics",
    "description": "Fix a lost-update data race in a counter using std::atomic instead of a heavy mutex.",
    "difficulty": "easy",
    "taskType": "Optimization",
    "technology": [
      "C++",
      "Concurrency"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 15,
    "skills": [
      "Atomics",
      "Lock-free"
    ],
    "tags": [
      "c++",
      "threads",
      "atomics"
    ],
    "companyPattern": "Netflix",
    "repositoryName": "cpp-race-condition-atomics",
    "fileCount": 3,
    "testCount": 2,
    "requirements": [
      "Ensure the final count is exactly correct under heavy contention"
    ],
    "constraints": [
      "Use std::atomic, no std::mutex"
    ],
    "acceptanceCriteria": [
      "Counter reaches exact expected value"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Change int to std::atomic<int>."
      }
    ]
  },
  {
    "id": 111,
    "slug": "cpp-hft-matching-engine",
    "title": "HFT Order Matching Engine",
    "description": "A multi-file High-Frequency Trading (HFT) order matching engine is experiencing phantom trades and dropped limit orders during high concurrency. The codebase uses multiple services (OrderBook, TradeRecorder, RiskManager, MatchingEngine). Fix the race conditions and logic bugs in the core matching engine.",
    "difficulty": "expert",
    "taskType": "Bug Fix",
    "technology": [
      "C++",
      "Concurrency"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 60,
    "skills": [
      "Data Structures",
      "Multithreading",
      "System Design"
    ],
    "tags": [
      "c++",
      "hft",
      "finance",
      "threading"
    ],
    "companyPattern": "Jane Street",
    "repositoryName": "cpp-hft-matching-engine",
    "fileCount": 12,
    "testCount": 5,
    "requirements": [
      "Ensure limit orders match exactly by price-time priority",
      "Prevent race conditions across multiple trading threads",
      "Fix the dropped order bug in the lock-free queue"
    ],
    "constraints": [
      "Must not use global locks (performance constraint)"
    ],
    "acceptanceCriteria": [
      "All threaded trading simulations pass without lost orders"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Look at how the MatchingEngine pops from the JobQueue during high contention."
      }
    ]
  },
  {
    "id": 112,
    "slug": "cpp-game-engine-task-scheduler",
    "title": "Game Engine Task Scheduler",
    "description": "A AAA game engine uses a custom thread-pool task scheduler to run physics, rendering, and AI jobs. However, jobs with dependencies are executing out of order, causing physics glitches. The project is split into JobQueue, WorkerThread, TaskGraph, and Timer.",
    "difficulty": "hard",
    "taskType": "Logic Fix",
    "technology": [
      "C++",
      "Multithreading"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 45,
    "skills": [
      "Graph Theory",
      "Thread Pools",
      "Synchronization"
    ],
    "tags": [
      "c++",
      "game-engine",
      "concurrency"
    ],
    "companyPattern": "Epic Games",
    "repositoryName": "cpp-game-engine-task-scheduler",
    "fileCount": 10,
    "testCount": 4,
    "requirements": [
      "Task dependencies must be strictly respected (DAG execution)",
      "Worker threads must safely steal work without deadlocking"
    ],
    "constraints": [
      "Use std::atomic and std::condition_variable"
    ],
    "acceptanceCriteria": [
      "All DAG dependency tests run deterministically"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Check the topological sort algorithm in TaskGraph."
      }
    ]
  },
  {
    "id": 113,
    "slug": "cpp-distributed-kv-store-node",
    "title": "Distributed KV Store Node",
    "description": "A distributed Key-Value store node handles incoming TCP requests, parses a custom binary protocol, and writes to a local LSM tree. The node crashes with a buffer overflow when handling fragmented network packets. Fix the protocol parser and the LSM tree compaction logic.",
    "difficulty": "hard",
    "taskType": "Bug Fix",
    "technology": [
      "C++",
      "Networking"
    ],
    "language": "cpp",
    "estimatedTimeMinutes": 55,
    "skills": [
      "Memory Management",
      "Network Protocols",
      "File I/O"
    ],
    "tags": [
      "c++",
      "databases",
      "networking"
    ],
    "companyPattern": "Cloudflare",
    "repositoryName": "cpp-distributed-kv-store-node",
    "fileCount": 14,
    "testCount": 6,
    "requirements": [
      "Correctly assemble fragmented packets in ProtocolParser",
      "Fix the buffer overflow in the deserialization loop",
      "Ensure LSM compaction thread does not invalidate iterators"
    ],
    "constraints": [
      "Zero-copy parsing where possible"
    ],
    "acceptanceCriteria": [
      "Passes malicious payload and fragmentation tests"
    ],
    "hints": [
      {
        "level": 1,
        "content": "Track the bytes read vs bytes expected in the socket buffer."
      }
    ]
  }
];