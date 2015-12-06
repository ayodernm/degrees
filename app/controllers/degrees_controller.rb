class DegreesController < ApplicationController
  before_action :set_degree, only: [:show, :edit, :update, :destroy]

  # GET /degrees
  # GET /degrees.json
  def index
    @dept_name = params[:dept_name]
    @degrees = Degree.all
    #response = RestClient.get 'http://jsonplaceholder.typicode.com/posts'
    #response = RestClient.get 'https://api.myjson.com/bins/1rlz1'
    #response = RestClient.get 'https://api.myjson.com/bins/3l4rz'
    response = RestClient.get @dept_name
    @parsed = JSON.parse(response)
    a=Array.new
    @b=Array.new
    count=0
    max_requirements=0
    no_of_terms=@parsed['terms'].size
    for k in 0..no_of_terms-1
    	count =@parsed['terms'][k]['requirements'].size 
    	if max_requirements < count
        	max_requirements= count
    	end
    end        

    for i in 0..no_of_terms-1
    	for j in 0..@parsed['terms'][i]['requirements'].size-1
    		a << @parsed['terms'][i]['requirements'][j]['name']
	     end	
    	@b.insert(i,a)
      a=Array.new
    end
  end

  # GET /degrees/1
  # GET /degrees/1.json
  def show
  end

  # GET /degrees/new
  def new
    @degree = Degree.new
  end

  # GET /degrees/1/edit
  def edit
  end

  # POST /degrees
  # POST /degrees.json
  def create
    @degree = Degree.new(degree_params)

    respond_to do |format|
      if @degree.save
        format.html { redirect_to @degree, notice: 'Degree was successfully created.' }
        format.json { render :show, status: :created, location: @degree }
      else
        format.html { render :new }
        format.json { render json: @degree.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /degrees/1
  # PATCH/PUT /degrees/1.json
  def update
    respond_to do |format|
      if @degree.update(degree_params)
        format.html { redirect_to @degree, notice: 'Degree was successfully updated.' }
        format.json { render :show, status: :ok, location: @degree }
      else
        format.html { render :edit }
        format.json { render json: @degree.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /degrees/1
  # DELETE /degrees/1.json
  def destroy
    @degree.destroy
    respond_to do |format|
      format.html { redirect_to degrees_url, notice: 'Degree was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_degree
      @degree = Degree.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def degree_params
      params[:degree]
    end
end
