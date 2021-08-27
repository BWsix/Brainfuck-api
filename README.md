# BrainFuck Api

BrainFuck api executes your code and returns both ascii string and ascii code array.

# Execute BrainFuck Code

## **POST** `/api`

executes your brainfuck code.

### Params

| FIELD |            TYPE            | DESCRIPTION                                                 | REQUIRED |
| :---: | :------------------------: | :---------------------------------------------------------- | :------: |
| code  |           string           | BrainFuck code (it is ok to include non brainfuck syntaxes) |   Yes    |
| input | string or array of numbers | ascii characters or array of numbers between 0 and 255      |    No    |

### Response

```json
{
  "output": {
    "str": "output in ascii string",
    "arr": [0, 1, 2, ..., 255] // output in ascii code array
  }
}
```

or

```json
{
  "error": "description"
}
```

### Example

Javascript

```js
await axios.post("https://brainfuck-api.vercel.app/api", {
  code: ",.,.,.",
  input: "hey",
});
```

Response

```
Status: 200 OK
```

```json
{
  "output": {
    "str": "hey",
    "arr": [104, 101, 121]
  }
}
```
