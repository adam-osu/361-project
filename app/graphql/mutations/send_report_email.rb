module Mutations
  class SendReportEmail < BaseMutation
    argument :email, String, required: true
    argument :subject, String, required: true
    argument :message, String, required: true

    field :status, Boolean, null: false

    def resolve(email: nil, subject: nil, message: nil)
      body = {
        email: email,
        subject: subject,
        message: message,
        HTML: "True"
      }.to_json

      response = HTTParty.post('https://emailer-microservice.herokuapp.com', {
        headers: {'Content-Type': "application/json"},
        body: body
      })

      { status: response.ok? }
    end
  end
end