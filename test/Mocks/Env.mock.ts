export default class MockEnv {
  static mock() {
    process.env.JWT_SECRET = "desafio";
  }
}
