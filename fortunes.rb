module Fortunes
  FOLDER="fortunes"

  def count
    Dir.entries(FOLDER).size - 2
  end
  
  module_function :count
end
