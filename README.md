# BrainFuck Api

I love BrainFuck.

### Table of Contents

- [Execute BrainFuck Code](#ebfc)
- [Convert Text to BrainFuck Code](#cttbfc)

## Execute BrainFuck Code<a id="ebfc"></a>

### **POST** `/api/execute`

executes your brainfuck code.

#### **Params**

| FIELD |            TYPE            | DESCRIPTION                                                 | REQUIRED |
| :---: | :------------------------: | :---------------------------------------------------------- | :------: |
| code  |           string           | BrainFuck code (it is ok to include non brainfuck syntaxes) |   Yes    |
| input | string or array of numbers | ascii characters or array of numbers between 0 and 255      |    No    |

#### **Response**

```json
{
  "output": {
    "str": "output in ascii string",
    "arr": [0, 1, 2, 254, 255] (output in ascii code)
  }
}
```

or

```json
{
  "error": "detail"
}
```

#### **Example**

Javascript

```js
await axios.post("https://brainfuck-api.vercel.app/api/execute", {
  code: ",.,.,.",
  input: "bob",
});
```

Python

```py
requests.post(
  "https://brainfuck-api.vercel.app/api/execute",
  {
    "code": ",.,.,.",
    "input": "bob",
  }
)
```

Response

```
Status: 200 OK
```

```json
{
  "output": {
    "str": "bob",
    "arr": [98, 111, 98]
  }
}
```

## Convert Text to BrainFuck Code <a id="cttbfc"></a>

### **POST** `/api/convert`

convert text to brainfuck code.

#### **Params**

| FIELD |  TYPE  | DESCRIPTION | REQUIRED |
| :---: | :----: | :---------- | :------: |
| text  | string | Text.       |   Yes    |

#### **Response**

```json
{
  "code": "Brain fuck code that prints your text."
}
```

or

```json
{
  "error": "detail"
}
```

#### **Example**

Javascript

```js
await axios.post("https://brainfuck-api.vercel.app/api/convert", {
  text: "bob",
});
```

Python

```py
requests.post(
  "https://brainfuck-api.vercel.app/api/convert",
  {
    "text": "bob",
  }
)
```

Response

```
Status: 200 OK
```

```json
{
  "code": "++++++++++[>+++++++++>+++++++++++<<-]\n>++++++++.>+.<."
}
```
