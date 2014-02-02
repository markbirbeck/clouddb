# clouddb

A cloud-based database.

The idea is to create a useful database and document store based on high-level components such as Amazon's S3, SimpleDB and SQS. Although the database may not be the most performant, it should end up being incredibly reliable. And by using AWS services it will be possible to get up and running with nothing more than a set of AWS keys.

To run the tests, copy the `config/environment.yaml` file to something suitable, and then set your AWS keys. The name of the file you use should be set in the `NODE_ENV` environment variable. For example, if you create a file `config/test.yaml` to hold your keys then you can test as follows:

```shell
export NODE_ENV=test
mocha
```

For more information on why that works, see the magical [config module](https://npmjs.org/package/config).

Alternatively, if using `npm test`, then create a `config/_default.yaml` file, which looks something like this:

```yaml
aws:
  accessKeyId: '12345678blah'
  secretAccessKey: xyzblah
```
