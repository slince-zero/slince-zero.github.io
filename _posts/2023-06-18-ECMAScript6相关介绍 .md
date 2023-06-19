---
layout: mypost
title: ES6相关介绍
categories: [教程]
---

### ECMAScript相关介绍 

1. 什么是ECMA
ECMA（European Computer Manufacturers Association）中文名称为欧洲计算机制造商协会，这个组织的目标是评估、开发和认可电信和计算机标准，1994 年后该组织改名为Ecma 国际

2. 什么是ECMAScript
ECMAScript 是E尺码国际通过ECMA-262标准化的脚本程序设计语言。ECMAScript定义了一套脚本语言的标准，规定了语法、类型、语句、关键字、保留字、操作符、对象等方面的规范。JavaScript是ECMAScript的一种实现，同时还包括了浏览器和Node.js等环境提供的API和对象。由于ECMAScript是一种标准化的语言，所以不同的JavaScript实现都应该遵循ECMAScript标准，以确保代码的可移植性和互操作性。

### ECMAScript 6 新特性

#### 1. let 关键字

let 关键字用来声明变量，使用let声明的变量有以下特点：

* 不允许重复声明
* 块级作用域
* 不存在变量提升
* 不影响作用域链
应用场景：以后声明变量用 let 就行

#### 2. cosnt 关键字

const 关键字用来声明常量，从const声明有以下特点：

* 声明必须赋初始值
* 标识符一般为大写
* 不允许重复声明
* 值不允许修改
* 块级作用域

注意：对象属性修改和元素变化不会发出const错误
应用场景：声明对象类型使用const，非对象类型声明选择let

```js
const arr = [1, 2, 3, 4];
arr.push(5, 6);
console.log(arr); // 不报错

const obj = {
uanme: 'rick',
age: 20;
}
obj.age = 11; // 只要不改变地址，就不报错
```

#### 3. 变量的解构赋值

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为 结构赋值

```js
// 以下是一个使用数组解构赋值案例：
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
```

```js
// 以下是一个使用对象解构赋值案例：
const obj = { x: 1, y: 2, z: 3 };
const { x, y, z } = obj;
console.log(x); // 1
console.log(y); // 2
console.log(z); // 3

```

#### 4. 模板字符串

模板字符串是增强版的字符串，用反引号来标识，特点：

* 字符串可以出现换行符
* 可以使用 ${xxx} 形式输出变量

应用场景：当遇到字符串与变量拼接的情况使用模板字符串

```js
let name = 'jack';
console.log(`hello, ${name}`);

let ul = 
`
  <ul>
   <li>1</li>
   <li>2</li>
   <li>3</li>
  </ul>
`
```

#### 5. 简化对象写法

在 ES6 中，我们可以使用简化对象写法来定义对象。这种写法可以让我们更加简洁地定义对象，避免了重复书写属性名和属性值

应用场景：以后就用简写就行

```js
const name = 'John';
const age = 30;

const person = {
  name,
  age
};

console.log(person); // { name: 'John', age: 30 }

// 在上面的代码中，我们定义了一个 `person` 对象，使用了简化对象写法。我们只需要写出属性名，然后将变量名赋值给属性名即可。这样就可以定义一个具有 `name` 和 `age` 属性的对象。
```

#### 6. 箭头函数

ES6允许使用 **=>** 定义函数

* function 写法
```js
function fn(param1, param2...) {
  // 函数体
  return expression;
}
```


* => 写法
```js
let fn = (param1, param2...) =>{
 // 函数体
 return expression;
}
```

注意：

* 如果形参只有一个，小括号可以省略
* 如果函数体只有一条语句，花括号可以省略，函数的返回值为该条语句的执行结果
* **箭头函数this是静态的，时钟指向声明时所在作用域下this的值**
```js
// 用箭头函数定义
const person = {
  name: 'Alice',
  sayName: () => {
    console.log(this.name);
  }
};

person.sayName();
//在这个例子中，箭头函数sayName被定义在person对象内部，因此它的this指向是person对象所在的作用域下的this值，即全局的this值。因此，当我们调用person.sayName()时，它会输出undefined。



// 用普通函数定义
const person = {
  name: 'Alice',
  sayName: function() {
    console.log(this.name);
  }
};

person.sayName();
//在这个例子中，sayName方法使用普通函数来定义，因此它的this指向是动态的，即指向调用该方法的对象，也就是person对象。因此，当我们调用person.sayName()时，它会输出Alice。

```

* **箭头函数不能作为构造函数实例化**
```js
// 箭头函数，不能被用作构造函数来创建实例化对象。这是因为箭头函数没有自己的 this 值，它的 this 值是继承自它所在的上下文
const Person = (name) => {
  this.name = name;
};

const john = new Person('John'); // TypeError: Person is not a constructor

function Person(name) {
  this.name = name;
}



// 普通函数
const john = new Person('John');
console.log(john.name); // "John"

```

* **箭头函数不能使用 `arguments` 对象**
`arguments` 对象是一个类数组对象，它包含了函数调用时传入的所有参数。在传统函数中，我们可以通过 `arguments` 对象来获取这些参数。但是，在箭头函数中，`arguments` 对象并不存在，因为箭头函数没有自己的 `this` 和 `arguments` 对象，它们会继承父级作用域的 `this` 和 `arguments` 对象

```js
function traditionalFunction() {
  console.log(arguments);
}

const arrowFunction = () => {
  console.log(arguments);
}

traditionalFunction(1, 2, 3); // 输出 [1, 2, 3]
arrowFunction(1, 2, 3); // 报错：arguments is not defined

// 在这个例子中，我们定义了一个传统函数 `traditionalFunction` 和一个箭头函数 `arrowFunction`，并且在它们内部分别打印了 `arguments` 对象。当我们调用 `traditionalFunction` 时，它会输出 `[1, 2, 3]`，因为 `arguments` 对象存在并包含了传入的参数。但是，当我们调用 `arrowFunction` 时，它会抛出一个错误，因为 `arguments` 对象不存在


// 因此，如果我们需要在箭头函数中获取参数，我们可以使用剩余参数语法 `...args` 来代替 `arguments` 对象。
const arrowFunction = (...args) => {
  console.log(args);
}

arrowFunction(1, 2, 3); // 输出 [1, 2, 3]

```

#### 7. 剩余参数rest

JavaScript 的剩余参数语法（rest parameter syntax）用三个点（...）表示，用于将函数的多个参数收集成一个数组

例如，以下函数的参数列表中使用了剩余参数语法：

```js
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(4, 5, 6, 7)); // 22
```

在这个例子中，`sum` 函数的参数列表中使用了剩余参数语法，将传入函数的所有参数收集成一个名为 `numbers` 的数组。函数内部使用 `reduce` 方法对数组中的所有元素求和，并返回求和结果

**需要注意的是，剩余参数语法只能用于函数的最后一个参数**

当我们在定义一个函数时，可以使用剩余参数语法来表示函数可以接受任意数量的参数。但是需要注意的是，剩余参数语法只能用于函数的最后一个参数

举个例子，假设我们要定义一个函数，用于计算任意数量的数字的平均值。我们可以使用剩余参数语法来实现：

```js
function average(...numbers) {
  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum / numbers.length;
}
```

在这个例子中，`...numbers`表示可以接受任意数量的参数，并将它们存储在一个数组中。我们可以像这样调用这个函数：

```js
console.log(average(1, 2, 3)); // 输出 2
console.log(average(4, 5, 6, 7)); // 输出 5.5
```

需要注意的是，剩余参数语法只能用于函数的最后一个参数。例如，下面这个函数定义是错误的：

```js
function example(...numbers, x) {
  // 错误的函数定义，剩余参数语法不能用于函数的最后一个参数之前
}
```


#### 8. 函数参数默认值设定

ES6允许给函数参数设置默认值，当调用函数时不给实参，则使用参数默认值，有默认值的形参一般要靠后

```js
let add = (x, y, z=3) => x + y +z;
console.log(add(1, 2)); // 6
```



#### 9. Spread扩展运算符

JS中的扩展运算符（spread operator）是三个点（...），它可以将一个数组或对象“展开”成多个独立的值。下面是一些扩展运算符的使用示例：

1. 将数组展开成函数参数：

```js
const arr = [1, 2, 3];
console.log(...arr); // 1 2 3

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(...arr)); // 6
```

2. 合并数组：

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];

console.log(arr3); // [1, 2, 3, 4, 5, 6]
```

3. 复制数组：

```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

console.log(arr2); // [1, 2, 3]
```

4. 将对象展开成另一个对象：

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };

console.log(obj2); // { a: 1, b: 2, c: 3 }
```

5. 复制对象：

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };

console.log(obj2); // { a: 1, b: 2 }
```

#### 10. Symbol

JavaScript 中的 Symbol 是一种基本数据类型，用于创建唯一且不可变的值，通常用作对象属性的键名。Symbol 值可以通过 Symbol() 函数进行创建，如下所示：

```js
const mySymbol = Symbol();
```

Symbol 值可以作为对象的属性键名，如下所示：

```js
const mySymbol = Symbol();
const myObj = {};
myObj[mySymbol] = 'Hello World';
console.log(myObj[mySymbol]); // 输出 'Hello World'
```

由于每个 Symbol 值都是唯一的，因此它们可以用于创建私有属性或方法，以避免命名冲突。例如，我们可以使用 Symbol 值作为对象的私有属性，如下所示：

```js
const mySymbol = Symbol('myPrivateProperty');
class MyClass {
  constructor() {
    this[mySymbol] = 'This is a private property';
  }
  getPrivateProperty() {
    return this[mySymbol];
  }
}
const myObj = new MyClass();
console.log(myObj.getPrivateProperty()); // 输出 'This is a private property'
console.log(myObj[mySymbol]); // 输出 undefined，因为 mySymbol 是私有属性，无法直接访问
```

除了使用 Symbol() 函数创建 Symbol 值外，还可以使用 Symbol.for() 函数创建全局共享的 Symbol 值。例如，我们可以使用 Symbol.for() 函数创建一个全局共享的 Symbol 值，并将其作为对象的属性键名，如下所示：

```js
const myGlobalSymbol = Symbol.for('myGlobalSymbol');
const myObj = {};
myObj[myGlobalSymbol] = 'Hello World';
console.log(myObj[myGlobalSymbol]); // 输出 'Hello World'
```

注意，使用 Symbol.for() 函数创建的 Symbol 值会被添加到全局符号注册表中，可以在不同的代码文件中共享和访问


#### 11. 迭代器

在 JavaScript 中，Symbol 是一种新的**原始数据类型**，它可以用来创建唯一的标识符，这些标识符可以用于对象的属性名或者其他需要唯一标识符的场合。而**迭代器**（Iterator）是一种**对象**，它提供了一种访问集合（如数组、对象和字符串等）中元素的方式，可以逐个访问集合中的元素，而不需要了解集合的内部实现。Symbol 和迭代器之间的关系是，迭代器使用 Symbol.iterator 属性来定义自己的迭代器方法，该方法返回一个迭代器对象，该对象包含一个 next() 方法，用于迭代集合中的元素。

举个例子，假设我们有一个数组，我们可以使用 Symbol.iterator 属性来定义一个迭代器方法，该方法返回一个迭代器对象，我们可以使用该对象的 next() 方法来逐个访问数组中的元素。下面是一个简单的例子：

```js
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

在上面的例子中，我们首先获取了数组的迭代器对象，然后使用该对象的 next() 方法来逐个访问数组中的元素，直到所有元素都被访问完毕。每次调用 next() 方法时，都会返回一个包含当前元素值和是否遍历完成的对象。当遍历完成时，done 属性为 true，value 属性为 undefined

需要注意的是，Symbol.iterator 属性只能在可迭代对象上使用，即实现了 @@iterator 方法的对象。常见的可迭代对象包括数组、Set、Map、字符串等

除了数组，ES6 还为许多内置集合类型（如 Set、Map 等）和自定义对象提供了迭代器支持。我们可以使用 for...of 循环来遍历这些集合类型中的元素，例如：
```js
const mySet = new Set([1, 2, 3]);
for (const value of mySet) {
  console.log(value);
}
// Output: 1 2 3

const myMap = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const [key, value] of myMap) {
  console.log(key, value);
}
// Output: a 1 b 2 c 3
```

在这些例子中，我们使用 for...of 循环来遍历集合类型中的元素。由于这些集合类型都实现了迭代器，因此我们可以直接使用 for...of 循环来遍历它们中的元素，而不需要手动调用 next() 方法

##### 工作原理

1. 创建一个指针对象，指向当前数据解构的起始位置
2. 第一次调用对象的next方法，指针自动指向数据解构的第一个对象
3. 接下来不断调用next对象，指针一直往后移动，直到指向最后一个成员
4. 每调用next方法，返回一个包含value和done的属性的对象

应用场景：需要自定义遍历数据的时候，要想到迭代器

##### 自定义遍历数据

在 JavaScript 中，我们可以使用自定义迭代器来遍历数据。自定义迭代器是一个对象，它定义了一个 next() 方法，当调用 next() 方法时，它返回一个包含 value 和 done 属性的对象，value 属性表示当前迭代到的值，done 属性为 true 表示迭代结束，为 false 表示还有更多的值需要迭代

下面是一个简单的例子，展示了如何使用自定义迭代器来遍历一个数组：

```javascript
const myArray = [1, 2, 3];

const myIterator = {
  [Symbol.iterator]: function() {
    let index = 0;
    return {
      next: function() {
        if (index < myArray.length) {
          return { value: myArray[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (let value of myIterator) {
  console.log(value); // 1 2 3
}
```

在这个例子中，我们定义了一个名为 myIterator 的对象，它包含一个 Symbol.iterator 方法，该方法返回一个包含 next() 方法的对象。next() 方法返回一个包含当前迭代到的值和是否迭代结束的对象。我们可以使用 for...of 循环来遍历 myIterator 对象，每次迭代时都会调用 next() 方法，直到 done 属性为 true 为止



##### 回调函数

回调函数是 JavaScript 中常见的一种编程模式，通常用于异步编程。一个回调函数就是一个函数，它作为参数传递给另一个函数，并且在该函数执行完毕后被调用。

以下是一个简单的例子，演示了如何使用回调函数来处理异步操作：

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 2000);
}

function displayData(data) {
  console.log(`Name: ${data.name}, Age: ${data.age}`);
}

fetchData(displayData);
```


这段代码的执行顺序和流程如下：

1. 首先，调用 `fetchData` 函数，并将 `displayData` 函数作为参数传递给它。

2. 在 `fetchData` 函数中，使用 `setTimeout` 函数模拟了一个异步操作，它会在 2000 毫秒后执行一个回调函数。

3. 在回调函数中，创建了一个包含 `name` 和 `age` 属性的对象，并将其作为参数传递给回调函数 `callback`。

4. `fetchData` 函数执行完毕后，控制权被返回到调用它的地方，即主程序。

5. 在主程序中，`fetchData` 函数的返回值为 `undefined`，因为它没有显式返回任何值。

6. 2000 毫秒后，`setTimeout` 函数执行回调函数。回调函数中调用了 `displayData` 函数，并将包含 `name` 和 `age` 属性的对象作为参数传递给它。

7. `displayData` 函数被调用，它会在控制台中输出 `Name: John, Age: 30`。

因此，整个程序的输出结果是 `Name: John, Age: 30`。


#### 12. Promise

##### Promise的定义和使用

**Promise**是ES6引入的异步编程的新解决方案，语法上Promise是一个构造函数，用来封装一部操作并可以获取其成功或失败的结果

一个**Promise**必然处于以下三种状态之一 ：
* 待定pending ：初始状态，既没有被兑现，也没有被拒绝
* 已兑现fulfilled ：意味着操作成功完成
* 已拒绝rejected ：意味着操作失败

**Promise**的使用 ：
* Promise构造函数 new Promise((resolve,reject) => {})
* Promise.prototype.then()方法
* Promise.prototype.catch()方法

当我们需要处理异步操作时，Promise 是一种非常有用的工具。Promise 是一个对象，它代表了一个异步操作的最终完成或失败，并且可以在完成或失败后返回一个值

下面是一个使用 Promise 的例子：

```js
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const randomNum = Math.random();
    if (randomNum > 0.5) {
      resolve(randomNum);
    } else {
      reject('Random number is too low');
    }
  }, 1000);
});

promise.then((result) => {
  console.log(`The random number is ${result}`);
}).catch((error) => {
  console.log(`Error: ${error}`);
});
```

在这个例子中，我们创建了一个 Promise 对象，并传入一个函数作为参数。这个函数接受两个参数：resolve 和 reject。当异步操作成功时，我们调用 resolve 函数并传入结果值。如果异步操作失败，则调用 reject 函数并传入错误信息

接着，我们使用 then 方法来处理 Promise 对象的成功情况，并使用 catch 方法来处理 Promise 对象的失败情况。在 then 方法中，我们可以访问异步操作的结果值，并进行一些处理。在 catch 方法中，我们可以访问异步操作的错误信息，并进行一些处理


在 JavaScript 中，我们可以使用 Promise 对象来封装 Ajax 请求。下面是一个简单的示例：

```js
function ajax(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror = function() {
      reject(Error('Network Error'));
    };
    xhr.send();
  });
}

// 调用示例
ajax('https://jsonplaceholder.typicode.com/posts')
  .then(function(response) {
    console.log('成功获取到数据：', response);
  })
  .catch(function(error) {
    console.log('获取数据失败：', error);
  });
  
```

在上面的示例中，我们定义了一个名为 ajax 的函数，它接受一个 URL 参数，并返回一个 Promise 对象。在 Promise 构造函数中，我们使用 XMLHttpRequest 对象来发送 Ajax 请求，并在请求成功或失败时调用 resolve 或 reject 方法来改变 Promise 的状态。在 then 方法中，我们定义了成功获取数据后的回调函数，而在 catch 方法中，我们定义了获取数据失败后的回调函数
