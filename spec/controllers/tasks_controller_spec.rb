require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe '-- tasks#index --' do
    it 'should list the tasks in the database' do
      task1 = FactoryBot.create(:task)
      task2 = FactoryBot.create(:task)

      task1.update_attributes(title: 'Something else')
      get :index
      response_value = ActiveSupport::JSON.decode(@response.body)

      expect(response).to have_http_status(:success)
      expect(response_value.count).to eq(2)

      # I feel like the following should be its own test:
      # it 'should return tasks in the order they were created' do...
      response_ids = response_value.map do |task|
        task['id']
      end

      expect(response_ids).to eq([task1.id, task2.id])
    end
  end

  describe '-- tasks#update --' do
    it 'should allow tasks to be marked as done' do
      task = FactoryBot.create(:task)

      put :update, params: {id: task.id, task: { done: true } }

      expect(response).to have_http_status(:success)

      task.reload

      expect(task.done).to eq(true)
    end
  end
end
