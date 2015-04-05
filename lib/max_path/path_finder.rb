
class DataChanger
public
	def initialize(file_name)
		@data = Array.new
		@data = read_file(file_name)
		@num_lines = @data.length
		@data_array = parse_data_array()
		@num_of_numbers = @data_array.length
		@num_cools = parse_data[0].length
	end
	# Считать из файла все числа, также узнает сколько строк в файле
	def read_file(file_name)
		data = Array.new
		File.open(file_name,"r").readlines.each do |line|
			data.push line
		end
		return data
	end

	def write_file(file_name, node_array)
		str_to_push = ""
		last_push = 0
		node_it = 0
		times_to_push = @num_lines - 1
		File.open(file_name, "w") do |l|
			(1..@num_of_numbers).each do |i|
				str_to_push += @data_array[i - 1].to_s
				if i - 1 == node_array[node_it]
					node_it += 1
					str_to_push += "!"
				end
				if @num_cools == i - last_push && times_to_push != 0
					str_to_push += "\n"
					times_to_push -= 1
					@num_cools += 1
					last_push = i
				elsif i != @num_of_numbers
					str_to_push += " "
				end
			end
			l.print str_to_push
		end
	end
	# На выходе получаем двумерный массив со всеми числами из файла
	def parse_data()
		data_array = Array.new
		sub_data_array = Array.new
		num_str = " "
		col_num = 0

		@data.each.with_index do |line, index|
			sub_data_array = []
			
			line.each_char do |c|
				col_num += 1

				if c != " " && c != "\n"
					num_str += c
				elsif num_str != " "
					sub_data_array.push num_str.to_i
					num_str = " "
				end

				if col_num == line.length && num_str != " "
				sub_data_array.push num_str.to_i
				end
			end

			data_array.push sub_data_array
			col_num = 0
		end
		return data_array
	end

	# Возвращает одномерный массив данных.
	def parse_data_array()
		data_array = Array.new
		num_str = " "
		@data.each.with_index do |line, index|
			line.each_char do |c|
				if c != " " && c != "\n"
					num_str += c
				elsif num_str != " "
					data_array.push num_str.to_i
					num_str = " "
				end
			end
		end
		data_array.push num_str.to_i
		return data_array
	end

	# Определяет количество линий N в файле
	# Пометка, теперь эти два метода не нужны, все можно получить из parse_data
	def get_num_lines()
		return @num_lines
	end

	def get_num_cools()
		return @num_cools
	end

end