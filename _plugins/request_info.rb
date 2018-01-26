module Jekyll
  class RequestInfoTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      request_info = []
      apis = context.registers[:site].data['apis']
      apis.each do |key, value|
        value['item'].each do |request|
          request_info << {name: request['name'], method: request['request']['method']}
        end
      end
      request_info.to_json
    end
  end
end

Liquid::Template.register_tag('request_info', Jekyll::RequestInfoTag)