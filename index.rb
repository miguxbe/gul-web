require 'erb'
require 'pp'
require 'lib'
require 'twitter'
require 'fortunes'
require 'base64'

include Lib
include Twitter

@sections = read_sections
@timeline = get_timeline
@last_updated = read_conditionally("last.dat").chomp
@story = @timeline.last
@photos = @timeline.collect do |story|
  story.pictures
end
@photos.flatten!

templates = {
  "--rss" => "rss.erb",
  "--html" => "index.erb", 
  "--json" => "index_json.erb"
}
template_name = templates[ARGV[0]] || templates["--html"]

template = ERB.new(File.new(template_name).read, nil, "-")
puts template.result(binding)
