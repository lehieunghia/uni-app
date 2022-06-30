import { rewriteConsoleExpr } from '../src/logs/console'
const filename = 'foo.vue'
describe('console', () => {
  test('console.log', () => {
    expect(
      rewriteConsoleExpr(filename, filename, `const a = 1;console.log(a);`).code
    ).toMatchSnapshot()
  })
  test('console.log multiline', () => {
    expect(
      rewriteConsoleExpr(
        filename,
        filename,
        `const a = 1;

console.log(a);
const b = 2
console.log(a,b);
console.log(a,b,c);
`
      ).code
    ).toMatchSnapshot()
  })
  test('console.info', () => {
    expect(
      rewriteConsoleExpr(filename, filename, `console.info(a,b,c);`).code
    ).toMatchSnapshot()
  })
  test('console.debug', () => {
    expect(
      rewriteConsoleExpr(filename, filename, `console.info(a,b,c);`).code
    ).toMatchSnapshot()
  })
  test('console.warn', () => {
    expect(
      rewriteConsoleExpr(filename, filename, `console.info(a,b,c);`).code
    ).toMatchSnapshot()
  })
  test('console.error', () => {
    expect(
      rewriteConsoleExpr(filename, filename, `console.info(a,b,c);`).code
    ).toMatchSnapshot()
  })
})