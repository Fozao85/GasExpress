import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GasNow API',
      version,
      description: 'Gas cylinder delivery service API',
      contact: {
        name: 'GasNow Team',
      },
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { type: 'object' },
            message: { type: 'string' },
            errors: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            errors: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['fullName', 'phone', 'password', 'role'],
          properties: {
            fullName: { type: 'string', example: 'John Doe' },
            phone: { type: 'string', example: '+233501234567' },
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', format: 'password' },
            role: { type: 'string', enum: ['CUSTOMER', 'VENDOR', 'RIDER', 'ADMIN'] },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['phone', 'password'],
          properties: {
            phone: { type: 'string' },
            password: { type: 'string', format: 'password' },
          },
        },
        AuthTokens: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                fullName: { type: 'string' },
                phone: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' },
                status: { type: 'string' },
              },
            },
          },
        },
        PaginationInfo: {
          type: 'object',
          properties: {
            page: { type: 'integer' },
            limit: { type: 'integer' },
            total: { type: 'integer' },
            totalPages: { type: 'integer' },
          },
        },
        VendorListItem: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            businessName: { type: 'string', description: 'Vendor business name' },
            phone: { type: 'string' },
            address: { type: 'string' },
            latitude: { type: 'number', nullable: true },
            longitude: { type: 'number', nullable: true },
            averageRating: { type: 'number' },
            isOpen: { type: 'boolean' },
            distance: { type: 'number', nullable: true, description: 'Distance in km' },
            eta: { type: 'integer', nullable: true, description: 'Estimated arrival in minutes' },
            lowestPrice: { type: 'number', nullable: true },
            availableProducts: { type: 'integer' },
          },
        },
        VendorDetail: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            businessName: { type: 'string' },
            ownerName: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', nullable: true },
            address: { type: 'string' },
            latitude: { type: 'number', nullable: true },
            longitude: { type: 'number', nullable: true },
            averageRating: { type: 'number' },
            isOpen: { type: 'boolean' },
            openingTime: { type: 'string', nullable: true },
            closingTime: { type: 'string', nullable: true },
            verificationStatus: { type: 'string' },
            lowestPrice: { type: 'number', nullable: true },
            inventory: {
              type: 'array',
              items: { $ref: '#/components/schemas/InventoryItem' },
            },
          },
        },
        InventoryItem: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            cylinderTypeId: { type: 'string', format: 'uuid' },
            cylinderSize: { type: 'number', description: 'Cylinder size in kg' },
            description: { type: 'string', nullable: true },
            price: { type: 'number' },
            stockQuantity: { type: 'integer' },
            inStock: { type: 'boolean' },
          },
        },
        ProductItem: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            vendorId: { type: 'string', format: 'uuid' },
            vendorName: { type: 'string' },
            vendorAddress: { type: 'string' },
            vendorRating: { type: 'number' },
            vendorIsOpen: { type: 'boolean' },
            size: { type: 'number', description: 'Cylinder size in kg' },
            price: { type: 'number' },
            stockQuantity: { type: 'integer' },
            inStock: { type: 'boolean' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            sizeKg: { type: 'number' },
            description: { type: 'string', nullable: true },
          },
        },
        Promotion: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            discountType: { type: 'string' },
            value: { type: 'number' },
            validUntil: { type: 'string', format: 'date-time' },
          },
        },
        HealthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                status: { type: 'string', example: 'ok' },
                timestamp: { type: 'string', format: 'date-time' },
                uptime: { type: 'number' },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints',
      },
      {
        name: 'Authentication',
        description: 'Auth endpoints (register, login, OTP, password reset, token refresh)',
      },
      {
        name: 'Vendors',
        description: 'Vendor discovery and search endpoints',
      },
      {
        name: 'Categories',
        description: 'Cylinder category and product endpoints',
      },
      {
        name: 'Promotions',
        description: 'Promotional offers and discounts',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
