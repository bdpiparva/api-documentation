{% highlight javascript %}
const settings = {
  "async": true,
  "crossDomain": true,
  "url": "{{ item.request.url.path | join: '/' }}",
  "method": "{{ item.request.method }}",
  "headers": {
    {% for header in item.request.header %}
    "{{header.key}}": "{{header.value}}",{% endfor %}
    "Authorization": "Basic " + btoa("username:password")
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
{% endhighlight %}
