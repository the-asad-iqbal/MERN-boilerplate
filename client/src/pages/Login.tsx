import { z } from 'zod'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/context/AuthContext';
import axios from '@/lib/axios'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'a@a.com',
            password: '12345678',
        },
    })

    const { toast } = useToast()

    const onSubmit = async (data: LoginFormValues) => {
        try {
            setIsLoading(true)

            const response = await axios.post('/auth/login', data)
            console.log(await response.data);


            if (response.data.success === false) {
                console.log(await response.data);
                const { message } = await response.data

                toast({
                    title: 'Error',
                    description: message,
                    variant: 'destructive',
                })

                throw new Error(message);
            }

            toast({
                title: 'Success',
                description: 'Logged in successfully',
            })

            login(response.data.data)

            navigate('/');
        } catch (error: any) {
            const { message } = await error.response.data

            toast({
                title: 'Error',
                description: message,
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader className="text-2xl font-bold text-center">Login</CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} autoComplete='email' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                autoComplete='current-password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
