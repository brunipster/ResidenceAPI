const {userController, vpController} = require('@Controller/')
const {UserRoles} = require('@Utils/constants')

module.exports = {
    user: [
      {
        methods: 'POST',
        path: '/register/guest',
        controller: userController.registerGuest,
        roles: [UserRoles.ADMIN, 
                UserRoles.MEMBER, 
                UserRoles.GUARD]
      },
      {
        methods: 'POST',
        path: '/register/member',
        controller: userController.registerMember,
        roles: [UserRoles.ADMIN]
      },
      {
        methods: 'POST',
        path: '/register/guard',
        controller: userController.registerGuard,
        roles: [UserRoles.ADMIN]
      },
      {
        methods: 'POST',
        path: '/register/admin',
        controller: userController.registerAdmin,
        roles: [UserRoles.ADMIN]
      },
      {
        methods: 'POST',
        path: '/auth',
        controller: userController.signin
      }
    ],
    virtualpass: [
      {
        methods: 'POST',
        path: '/create',
        controller: vpController.create,
        roles: [UserRoles.GUEST, UserRoles.MEMBER, UserRoles.GUARD, UserRoles.ADMIN]
      },
      {
        methods: 'get',
        path: '/get/code/:code',
        controller: vpController.getByCode,
        roles: [UserRoles.GUEST, UserRoles.MEMBER, UserRoles.GUARD, UserRoles.ADMIN]
      }
    ]
  }