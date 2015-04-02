#require_dependency "./lib/path_finder/path_finder.rb"
class HomeController < ApplicationController

	def index
	end
	def calculate
		n1 = DataChanger.new("out.txt")
		@res = @n1.parse_data()
	end
end
