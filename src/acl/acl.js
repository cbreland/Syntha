import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'initial'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (userInfo && userInfo.userRole) initialRole = userInfo.userRole

debugger


export default new AclCreate({
  initial  : initialRole,
  notfound: {
    path: '/pages/not-authorized',
    forwardQueryParams: true
  },
  router,
  acceptLocalRules : true,
  globalRules: {
    initial   : new AclRule('initial').or('staff').or('attorney').or('accountAdmin').or('siteAdmin').generate(),
    admin     : new AclRule('admin').generate(),
    editor    : new AclRule('editor').or('admin').generate(), 
    siteAdmin : new AclRule('siteAdmin').generate(),
    accountAdmin : new AclRule('accountAdmin').or('siteAdmin').generate()
   
  }
  
})
