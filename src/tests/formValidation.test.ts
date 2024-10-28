import { expect, test } from 'vitest';
import { z } from 'zod';

const schema = z.object( {
    fullName: z.string().min( 1, { message: "Full name is required" } ),
    email: z.string().email( { message: "Invalid email address" } ),
    issueType: z.string().min( 1, { message: "Please select an issue type" } ),
    tags: z.array( z.string() ).min( 1, { message: "Please select at least one tag" } ),
    steps: z.array( z.string().min( 1, { message: "Step is required" } ) ).min( 1, { message: "Please add at least one step" } ),
} );

test('form validation schema', async () => {
  // Test fullName validation
  expect(() => schema.parse({ fullName: '', email: 'test@example.com', issueType: 'Bug Report', tags: ['UI'], steps: ['Step 1'] }))
    .toThrowError(/Full name is required/);

  // Test email validation
  expect(() => schema.parse({ fullName: 'John Doe', email: 'invalidemail', issueType: 'Bug Report', tags: ['UI'], steps: ['Step 1'] }))
    .toThrowError(/Invalid email address/);

  // Test issueType validation
  expect(() => schema.parse({ fullName: 'John Doe', email: 'test@example.com', issueType: '', tags: ['UI'], steps: ['Step 1'] }))
    .toThrowError(/Please select an issue type/);

  // Test tags validation
  expect(() => schema.parse({ fullName: 'John Doe', email: 'test@example.com', issueType: 'Bug Report', tags: [], steps: ['Step 1'] }))
    .toThrowError(/Please select at least one tag/);

  // Test steps validation
  expect(() => schema.parse({ fullName: 'John Doe', email: 'test@example.com', issueType: 'Bug Report', tags: ['UI'], steps: [''] }))
    .toThrowError(/Step is required/);

  // Test all valid inputs (should not throw)
  expect(() =>
    schema.parse({
      fullName: 'John Doe',
      email: 'test@example.com',
      issueType: 'Bug Report',
      tags: ['UI'],
      steps: ['Step 1'],
    })
  ).not.toThrow();
});
