import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../page/layout/Layout.vue'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('Login'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    isHome: true,
    name: '',
    children: [
      {
        path: 'home',
        name: '首页',
        component: resolve => require(['@/page/Home.vue'], resolve)
      }
    ]
  }, 
	{
    path: '',
    icon: 'icon-home',
    redirect: 'home',
    component: Layout,
    noDropdown: true,
    name: '首页',
    children: [
      {
        path: 'home',
        name: '首页',
        component: resolve => require(['@/page/Home.vue'], resolve)
      }
    ]
	},
  {
    path: '/supplierManage',
    component: Layout,
    roleName: 'supplier_manage_menu',
    name: '供应商管理',
    hidden: true,
    icon: 'icon-supplier-manage',
    children: [
      {
        path: 'supplierRegister',
        roleName: 'supplier_manage_register_list_menu',
        name: '供应商注册',
        component: resolve => require(['@/page/supplierManage/SupplierRegister.vue'], resolve)
      },
      {
        path: 'supplierMaintenance',
        roleName: 'platform-list-menu',
        name: '供应商维护',
        component: resolve => require(['@/page/supplierManage/SupplierMaintenance.vue'], resolve)
      },
      {
        hidden: true,
        path: 'supplierDetail/:id',
        roleName: 'supplier_manage_register_list_view',
        name: '供应商详情',
        component: resolve => require(['@/page/supplierManage/SupplierDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/CoreBusinessManage',
    component: Layout,
    roleName: 'core_enterprise_manage_menu',
    name: '核心企业管理',
    hidden: true,
    icon: 'icon-business-manage',
    children: [
      {
        path: 'CoreBusinessList',
        roleName: 'core_enterprise_manage_list',
        name: '核心企业列表',
        component: resolve => require(['@/page/CoreBusinessManage/CoreBusinessList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'CoreBusinessDetail/:id',
        roleName: 'core_enterprise_manage_list_view',
        name: '核心企业详情',
        component: resolve => require(['@/page/CoreBusinessManage/CoreBusinessDetail.vue'], resolve)
      },
      {
        hidden: true,
        path: 'CoreBusinessAdd',
        roleName: 'core_enterprise_manage_add',
        name: '新增核心企业',
        component: resolve => require(['@/page/CoreBusinessManage/CoreBusinessAdd.vue'], resolve)
      }
    ]
  },
  {
    path: '/accountManage',
    component: Layout,
    roleName: 'receivable_manage_menu',
    name: '应收账款管理',
    hidden: true,
    icon: 'icon-account-manage',
    children: [
      {
        path: 'accountReceivable',
        roleName: 'receivable_manage_receive_list_menu',
        name: '应收账款列表',
        component: resolve => require(['@/page/accountManage/accountReceivable.vue'], resolve)
      },
      {
        hidden: true,
        path: 'accountDetail/:id',
        roleName: 'receivable_manage_receive_list_view',
        name: '应收账款详情',
        component: resolve => require(['@/page/accountManage/accountDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/financeManage',
    component: Layout,
    roleName: 'finance_manage_menu',
    name: '融资审核管理',
    hidden: true,
    icon: 'icon-finance-manage',
    children: [
      {
        path: 'financeAudit',
        roleName: 'finance_manage_finance_list_menu',
        name: '融资审核列表',
        component: resolve => require(['@/page/financeManage/financeAudit.vue'], resolve)
      },
      {
        hidden: true,
        path: 'financeDetail/:id',
        roleName: 'finance_manage_register_list_view',
        name: '融资审核详情',
        component: resolve => require(['@/page/financeManage/financeDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/loanManage',
    component: Layout,
    roleName: 'loan_manage_menu',
    name: '放款管理',
    hidden: true,
    icon: 'icon-loan-manage',
    children: [
      {
        path: 'loanAudit',
        roleName: 'loan_manage_loan_list_menu',
        name: '放款列表',
        component: resolve => require(['@/page/loanManage/loanAudit.vue'], resolve)
      },
      {
        hidden: true,
        path: 'loanDetail/:id',
        roleName: 'loan_manage_loan_list_view',
        name: '放款详情',
        component: resolve => require(['@/page/loanManage/loanDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/authorityManage',
    component: Layout,
    roleName: 'permission_manage_menu',
    name: '权限管理',
    hidden: true,
    icon: 'icon-authority-manage',
    children: [
      {
        path: 'userMaintain',
        roleName: 'permission_manage_operator_manage_menu',
        name: '用户维护',
        component: resolve => require(['@/page/authorityManage/userMaintain.vue'], resolve)
      },
      {
        path: 'roleMaintain',
        roleName: 'permission_manage_role_manage_menu',
        name: '角色维护',
        component: resolve => require(['@/page/authorityManage/roleMaintain.vue'], resolve)
      }
    ]
  },{
    path: '/MerchantsAudit',
    component: Layout,
    roleName: 'payment_manage_menu',
    name: '商户审核',
    icon: 'icon-supplier-manage',
    children: [
      {
        path: 'MerchantsAuditList',
        roleName: 'payment_manage_payment_list_menu',
        name: '商户审核列表',
        component: resolve => require(['@/page/MerchantsAudit/MerchantsAuditList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'MerchantsAuditDetail/:id',
        roleName: 'payment_manage_payment_list_view',
        name: '商户审核详情',
        component: resolve => require(['@/page/MerchantsAudit/MerchantsAuditDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/merchantManage',
    component: Layout,
    roleName: 'payment_manage_menu',
    name: '商户管理',
    icon: 'icon-business-manage',
    children: [
      {
        path: 'merchantList',
        roleName: 'payment_manage_payment_list_menu',
        name: '商户列表',
        component: resolve => require(['@/page/merchantManage/merchantList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'merchantDetail/:id',
        roleName: 'payment_manage_payment_list_view',
        name: '商户详情',
        component: resolve => require(['@/page/merchantManage/merchantDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/financeLoanManage',
    component: Layout,
    roleName: 'payment_manage_menu',
    name: '融资放款',
    icon: 'icon-account-manage',
    children: [
      {
        path: 'financeLoanList',
        roleName: 'payment_manage_payment_list_menu',
        name: '融资放款列表',
        component: resolve => require(['@/page/financeLoanManage/financeLoanList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'financeLoanDetail/:id',
        roleName: 'payment_manage_payment_list_view',
        name: '融资放款详情',
        component: resolve => require(['@/page/financeLoanManage/financeLoanDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/repaymentManage',
    component: Layout,
    roleName: 'payment_manage_menu',
    name: '还款管理',
    icon: 'icon-repayment-manage',
    children: [
      {
        path: 'repaymentList',
        roleName: 'payment_manage_payment_list_menu',
        name: '还款列表',
        component: resolve => require(['@/page/repaymentManage/repaymentList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'repaymentDetail/:id',
        roleName: 'payment_manage_payment_list_view',
        name: '还款详情',
        component: resolve => require(['@/page/repaymentManage/repaymentDetail.vue'], resolve)
      },
      {
        path: 'repaymentRegisterList',
        roleName: 'payment_manage_payment_register_menu',
        name: '商户还款登记',
        component: resolve => require(['@/page/repaymentManage/repaymentRegisterList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'repaymentRegisterDetail/:id',
        roleName: 'payment_manage_payment_register_view',
        name: '还款登记详情',
        component: resolve => require(['@/page/repaymentManage/repaymentRegisterDetail.vue'], resolve)
      },
      {
        path: 'repaymentIncomeList',
        roleName: 'payment_manage_payment_income_menu',
        name: '银行进账记录',
        component: resolve => require(['@/page/repaymentManage/repaymentIncomeList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'repaymentIncomeDetail/:id',
        roleName: 'payment_manage_payment_income_view',
        name: '银行进账详情',
        component: resolve => require(['@/page/repaymentManage/repaymentIncomeDetail.vue'], resolve)
      },
    ]
  },
//{
//  path: '/overdueManage',
//  component: Layout,
//  roleName: 'payment_manage_menu',
//  name: '逾期管理',
//  icon: 'icon-loan-manage',
//  children: [
//    {
//      path: 'overdueList',
//      roleName: 'payment_manage_payment_list_menu',
//      name: '逾期列表',
//      component: resolve => require(['@/page/overdueManage/overdueList.vue'], resolve)
//    },
//    {
//      hidden: true,
//      path: 'overdueDetail/:id',
//      roleName: 'payment_manage_payment_list_view',
//      name: '逾期详情',
//      component: resolve => require(['@/page/overdueManage/overdueDetail.vue'], resolve)
//    }
//  ]
//}
]
export default new Router({
  routes: constantRouterMap
})
export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true },
   // 有权限限制
  {
    path: '',
    icon: 'icon-home',
    redirect: 'home',
    component: Layout,
    noDropdown: true,
    name: '首页',
    children: [
      {
        path: 'home',
        name: '首页',
        component: resolve => require(['@/page/Home.vue'], resolve)
      }
    ]
  },
  {
    path: '/supplierManage',
    component: Layout,
    roleName: 'supplier_manage_menu',
    name: '供应商管理',
    hidden: true,
    icon: 'icon-supplier-manage',
    children: [
      {
        path: 'supplierRegister',
        roleName: 'supplier_manage_register_list_menu',
        name: '供应商注册',
        component: resolve => require(['@/page/supplierManage/SupplierRegister.vue'], resolve)
      },
      {
        path: 'supplierMaintenance',
        roleName: 'platform-list-menu',
        name: '供应商维护',
        component: resolve => require(['@/page/supplierManage/SupplierMaintenance.vue'], resolve)
      },
      {
        hidden: true,
        path: 'supplierDetail/:id',
        roleName: 'supplier_manage_register_list_view',
        name: '供应商详情',
        component: resolve => require(['@/page/supplierManage/SupplierDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/CoreBusinessManage',
    component: Layout,
    roleName: 'core_enterprise_manage_menu',
    name: '核心企业管理',
    hidden: true,
    icon: 'icon-business-manage',
    children: [
      {
        path: 'CoreBusinessList',
        roleName: 'core_enterprise_manage_list',
        name: '核心企业列表',
        component: resolve => require(['@/page/CoreBusinessManage/CoreBusinessList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'CoreBusinessDetail/:id',
        roleName: 'core_enterprise_manage_list_view',
        name: '核心企业详情',
        component: resolve => require(['@/page/CoreBusinessManage/CoreBusinessDetail.vue'], resolve)
      },
      {
        hidden: true,
        path: 'CoreBusinessAdd',
        roleName: 'core_enterprise_manage_add',
        name: '新增核心企业',
        component: resolve => require(['@/page/CoreBusinessManage/CoreBusinessAdd.vue'], resolve)
      }
    ]
  },
  {
    path: '/accountManage',
    component: Layout,
    roleName: 'receivable_manage_menu',
    name: '应收账款管理',
    hidden: true,
    icon: 'icon-account-manage',
    children: [
      {
        path: 'accountReceivable',
        roleName: 'receivable_manage_receive_list_menu',
        name: '应收账款列表',
        component: resolve => require(['@/page/accountManage/accountReceivable.vue'], resolve)
      },
      {
        hidden: true,
        path: 'accountDetail/:id',
        roleName: 'receivable_manage_receive_list_view',
        name: '应收账款详情',
        component: resolve => require(['@/page/accountManage/accountDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/financeManage',
    component: Layout,
    roleName: 'finance_manage_menu',
    name: '融资审核管理',
    hidden: true,
    icon: 'icon-finance-manage',
    children: [
      {
        path: 'financeAudit',
        roleName: 'finance_manage_finance_list_menu',
        name: '融资审核列表',
        component: resolve => require(['@/page/financeManage/financeAudit.vue'], resolve)
      },
      {
        hidden: true,
        path: 'financeDetail/:id',
        roleName: 'finance_manage_register_list_view',
        name: '融资审核详情',
        component: resolve => require(['@/page/financeManage/financeDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/loanManage',
    component: Layout,
    roleName: 'loan_manage_menu',
    name: '放款管理',
    hidden: true,
    icon: 'icon-loan-manage',
    children: [
      {
        path: 'loanAudit',
        roleName: 'loan_manage_loan_list_menu',
        name: '放款列表',
        component: resolve => require(['@/page/loanManage/loanAudit.vue'], resolve)
      },
      {
        hidden: true,
        path: 'loanDetail/:id',
        roleName: 'loan_manage_loan_list_view',
        name: '放款详情',
        component: resolve => require(['@/page/loanManage/loanDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/authorityManage',
    component: Layout,
    roleName: 'permission_manage_menu',
    name: '权限管理',
    hidden: true,
    icon: 'icon-authority-manage',
    children: [
      {
        path: 'userMaintain',
        roleName: 'permission_manage_operator_manage_menu',
        name: '用户维护',
        component: resolve => require(['@/page/authorityManage/userMaintain.vue'], resolve)
      },
      {
        path: 'roleMaintain',
        roleName: 'permission_manage_role_manage_menu',
        name: '角色维护',
        component: resolve => require(['@/page/authorityManage/roleMaintain.vue'], resolve)
      }
    ]
  },{
    path: '/MerchantsAudit',
    component: Layout,
    roleName: 'payment_manage_menu',
    name: '商户审核',
    icon: 'icon-supplier-manage',
    children: [
      {
        path: 'MerchantsAuditList',
        roleName: 'payment_manage_payment_list_menu',
        name: '商户审核列表',
        component: resolve => require(['@/page/MerchantsAudit/MerchantsAuditList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'MerchantsAuditDetail/:id',
        roleName: 'payment_manage_payment_list_view',
        name: '商户审核详情',
        component: resolve => require(['@/page/MerchantsAudit/MerchantsAuditDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/merchantManage',
    component: Layout,
    roleName: 'payment_manage_menu',
    name: '商户管理',
    icon: 'icon-business-manage',
    children: [
      {
        path: 'merchantList',
        roleName: 'payment_manage_payment_list_menu',
        name: '商户列表',
        component: resolve => require(['@/page/merchantManage/merchantList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'merchantDetail/:id',
        roleName: 'payment_manage_payment_list_view',
        name: '商户详情',
        component: resolve => require(['@/page/merchantManage/merchantDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/financeLoanManage',
    component: Layout,
    roleName: 'payment_manage_menu',
    name: '融资放款',
    icon: 'icon-account-manage',
    children: [
      {
        path: 'financeLoanList',
        roleName: 'payment_manage_payment_list_menu',
        name: '融资放款列表',
        component: resolve => require(['@/page/financeLoanManage/financeLoanList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'financeLoanDetail/:id',
        roleName: 'payment_manage_payment_list_view',
        name: '融资放款详情',
        component: resolve => require(['@/page/financeLoanManage/financeLoanDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/repaymentManage',
    component: Layout,
    roleName: 'payment_manage_menu',
    name: '还款管理',
    icon: 'icon-repayment-manage',
    children: [
      {
        path: 'repaymentList',
        roleName: 'payment_manage_payment_list_menu',
        name: '还款列表',
        component: resolve => require(['@/page/repaymentManage/repaymentList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'repaymentDetail/:id',
        roleName: 'payment_manage_payment_list_view',
        name: '还款详情',
        component: resolve => require(['@/page/repaymentManage/repaymentDetail.vue'], resolve)
      },
      {
        path: 'repaymentRegisterList',
        roleName: 'payment_manage_payment_register_menu',
        name: '商户还款登记',
        component: resolve => require(['@/page/repaymentManage/repaymentRegisterList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'repaymentRegisterDetail/:id',
        roleName: 'payment_manage_payment_register_view',
        name: '还款登记详情',
        component: resolve => require(['@/page/repaymentManage/repaymentRegisterDetail.vue'], resolve)
      },
      {
        path: 'repaymentIncomeList',
        roleName: 'payment_manage_payment_income_menu',
        name: '银行进账记录',
        component: resolve => require(['@/page/repaymentManage/repaymentIncomeList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'repaymentIncomeDetail/:id',
        roleName: 'payment_manage_payment_income_view',
        name: '银行进账详情',
        component: resolve => require(['@/page/repaymentManage/repaymentIncomeDetail.vue'], resolve)
      },
    ]
  },
  {
    path: '/overdueManage',
    component: Layout,
    roleName: 'payment_manage_menu',
    name: '逾期管理',
    icon: 'icon-loan-manage',
    children: [
      {
        path: 'overdueList',
        roleName: 'payment_manage_payment_list_menu',
        name: '逾期列表',
        component: resolve => require(['@/page/overdueManage/overdueList.vue'], resolve)
      },
      {
        hidden: true,
        path: 'overdueDetail/:id',
        roleName: 'payment_manage_payment_list_view',
        name: '逾期详情',
        component: resolve => require(['@/page/overdueManage/overdueDetail.vue'], resolve)
      }
    ]
  }
]

