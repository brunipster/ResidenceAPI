const {userController, vpController,familiesController, membersController} = require('@Controller')
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
        methods: 'GET',
        path: '/code/:code',
        controller: vpController.getByCode,
        roles: [UserRoles.GUEST, UserRoles.MEMBER, UserRoles.GUARD, UserRoles.ADMIN]
      },
      {
        methods: 'POST',
        path: '/checkin',
        controller: vpController.sendCheckIn,
        roles: [UserRoles.GUARD, UserRoles.ADMIN]
      }
      ,
      {
        methods: 'POST',
        path: '/checkout',
        controller: vpController.sendCheckOut,
        roles: [UserRoles.GUARD, UserRoles.ADMIN]
      }
    ],
    family:[
      {
        methods: 'POST', 
        path:'/register', 
        controller: familiesController.create,
        roles: [UserRoles.ADMIN]
      },
      {
        methods: 'GET', 
        path:'/id/:id', 
        controller: familiesController.getById,
        roles: [UserRoles.ADMIN]
      }
    ],
    member:[
      {
        methods: 'GET',
        path:'/id/:id',
        controller: membersController.getById,
        roles: [UserRoles.ADMIN]
      }
    ]
  }