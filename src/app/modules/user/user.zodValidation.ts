import z from 'zod';

const UserValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(50),
  fullName: z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
  }),
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().min(1).max(100),
    city: z.string().min(1).max(50),
    country: z.string().min(1).max(50),
  }),
});

export default UserValidationSchema;
