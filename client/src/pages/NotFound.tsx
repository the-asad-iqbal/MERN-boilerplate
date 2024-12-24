import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Container } from "@/components/ui/container"

const NotFound = () => {
    const handleGoBack = () => {
        window.history.back()
    }

    return (
        <div className="min-h-screen bg-background flex items-center">
            <Container>
                <Card className="max-w-md mx-auto text-center">
                    <CardHeader>
                        <CardTitle className="text-6xl font-bold mb-4">404</CardTitle>
                        <CardDescription className="text-xl">
                            Oops! The page you're looking for doesn't exist.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-center">
                        <Button onClick={handleGoBack}>
                            Go Back
                        </Button>
                    </CardFooter>
                </Card>
            </Container>
        </div>
    )
}

export default NotFound
