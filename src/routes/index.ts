import { Dashboard } from "../pages/Dashboard/Dashboard"
import { ListTicket } from "../pages/Manage/ListTicket/ListTicket"
import { CheckTicket } from "../pages/Manage/CheckTicket/CheckTicket"
import { PackService } from "../pages/Manage/PackService/PackService"

const publicRoutes = [
    {
        path: '/listTicket',
        component: ListTicket
    },
    {
        path: '/check-ticket',
        component: CheckTicket
    },
    {
        path: '/pack-service',
        component: PackService
    },
]

export { publicRoutes }