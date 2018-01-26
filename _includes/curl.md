{% highlight bash %}
curl -X GET --url '{{ item.request.url.path | join: '/' }}' \
{% for header in item.request.header %}-H '{{header.key}}:{{header.value}}' \
{% endfor %}-u 'username:password'{% if item.request.body.raw != null %}\
-d '{{item.request.body.raw}}'
{% endif %}
{% endhighlight %}