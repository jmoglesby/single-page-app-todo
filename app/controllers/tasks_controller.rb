class TasksController < ApplicationController
  def index
    render json: Task.all.order(:id)
  end

  def create
    task = Task.create(task_params)
    render json: task if task.valid?
  end

  def update
    task = Task.find(params[:id])
    task.update_attributes(task_params)
    render json: task
  end

  private # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  def task_params
    params.require(:task).permit(:title, :done)
  end
end
