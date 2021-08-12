module Mutations
  class DeleteCategory < BaseMutation
    argument :id, Integer, required: false

    field :status, Boolean, null: false

    def resolve(id: nil)
      return unless context[:current_user]

      category = Category.find_by(id: id, user_id: context[:current_user].id)
      return { status: false } unless category

      result = category.destroy

      { status: result }
    end
  end
end