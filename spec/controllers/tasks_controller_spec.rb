require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe '-- tasks#index --' do
    it 'should list the tasks in the database' do
      task1 = FactoryBot.create(:task)
      task2 = FactoryBot.create(:task)

      get :index
      response_value = ActiveSupport::JSON.decode(@response.body)

      expect(response).to have_http_status(:success)
      expect(response_value.count).to eq(2)
    end
  end
end
