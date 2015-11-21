json.array!(@degrees) do |degree|
  json.extract! degree, :id
  json.url degree_url(degree, format: :json)
end
