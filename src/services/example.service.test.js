const exampleService = require('./example.service');

describe('Example service', () => {
  test('should return Hello, World!', () => {
    const message = exampleService.sayHello();
    expect(message).toBe('Hello, World!');
    expect(typeof message).toBe('string');
  });
});
