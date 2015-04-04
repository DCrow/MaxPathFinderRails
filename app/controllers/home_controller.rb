require_dependency "./lib/max_path/path_finder.rb"
require_dependency "./lib/max_path/node_lookup.rb"

class HomeController < ApplicationController

	def index
	end
	def calculate
		File.open("./tmp/max_path/in.txt", "w") { |file| file.print params[:numbers]  }
		d1 = DataChanger.new("./tmp/max_path/in.txt")
		n1 = Node.new(d1.parse_data_array())
		n1.find_max_sum_path()
		d1.write_file("./tmp/max_path/out.txt", n1.get_node_max_path())
		@res2 = File.read("./tmp/max_path/out.txt")
	end
end
