module Geojson
  class Generator < Jekyll::Generator
    def generate(site)
      data = File.join "js", "data.js";
      File.open data, "w" do |file|
        file.puts "var data = ["

        Dir.glob('geojson/*.geojson') do |geojson|
          json = File.read(geojson) + ","
          file.puts json
        end

        file.puts "];"
      end
    end
  end
end