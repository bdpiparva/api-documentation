{% highlight bash %}
curl -X GET --url '{{ item.request.url.path | join: '/' }}' \
{% for header in item.request.header %}-H '{{header.key}}:{{header.value}}' \
{% endfor %}-u 'username:password'
{% endhighlight %}