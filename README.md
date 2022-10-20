# sugar-filter
Javascript Object filter with syntactic sugar

When full text search is overkill and you want something light weight to filter an array of objects.

Useful for tables of data that you don't know how the user would like to view.

Sugar filter won't mutate or change the shape of your data. And is dependancy free, keeping it light weight and minimises sub dependancies.

Allows generic or proptery based object filtering.


Currently supports:

```
filter([...], "keyword")
filter([...], "fire")
filter([...], "tag:fire")
filter([...], "id:1")
```

Aims to support:

```
filter([...], "id:1-10") // range based
filter([...], "id>10") // basic comparason operators
filter([...], "createdAt:today") // natural language key words for date
```

* The ability to assign custom matchers.
* Operate on streams.
