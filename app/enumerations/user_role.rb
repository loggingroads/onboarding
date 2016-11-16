class UserRole < EnumerateIt::Base
  associate_values(
      admin: [1, 'Admin'],
      user: [2, 'User'],
      guest: [3, 'Guest']
  )
end
