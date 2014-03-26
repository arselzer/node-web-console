A Node.js Web Console using WebSockets and vm
==========

This is an experiment using the Node.js vm module and websockets
to execute Node.js over the web.

## Usage
```bash
$ git clone https://github.com/AlexanderSelzer/node-web-console.git
$ cd node-web-console

$ npm install && cd public && bower install

$ node index.js
$ node server.js
```

Open http://localhost:8676

Please be careful not to leave this unprotected in the internet, as someone could
easily overflow the computer's memory :)

## How it works

Node's `vm` module is quite cool, as it allows us to isolate a V8 context from 
the rest of the process.

We can construct a context and pass it to the VM. After it has finished executing,
the context can be inspected.

In this case, a context is constructed, and passed some useful core node modules:
	console, path, Buffer, os, url
`console` is a special construction (lib/vconsole), which does not write to standard output, but rather
to a internal variable, which is then sent back to the client.
I am basically "faking" `console` :)

It is possible to include other useful modules, but I have not yet made an effort to do so.
Change the context declaration in `index.js` if you'd like to use a module.

## Example

Type this into the console:

```JavaScript
console.log(path.join(".", "27", "..", "node_modules", "lib"))

var buffy = new Buffer(32);

buffy.write("hi")

console.log(buffy.toString("hex"))

os.cpus().forEach(function (cpu) { console.log(cpu.model) })

console.log(url.parse("http://user:pass@host.com:8080/p/a/t/h?query=string#hash"))

console.dir("hi")
```

```
node_modules/lib
68690204010000000400000000000000a08f0204010000000000000000000000
Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz
Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz
Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz
Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz
Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz
Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz
Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz
Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz
{ protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
'hi'
```

![Screenshot](https://raw.githubusercontent.com/AlexanderSelzer/node-web-console/master/screenshot.jpg)