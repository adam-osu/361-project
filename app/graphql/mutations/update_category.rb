module Mutations
  class UpdateCategory < BaseMutation
    argument :id, Integer, required: true
    argument :name, String, required: false
    argument :description, String, required: false

    field :status, Boolean, null: false

    def resolve(id: nil, name: nil, description: nil)
      return { status: false } unless context[:current_user]

      updates = {
        name: name,
        description: description,
      }.compact

      category = Category.find_by(id: id, user_id: context[:current_user].id)
      return { status: false } unless category
      result = category.update(updates)

      { status: result }
    end
  end
end