import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import ReactIcon from "@/assets/react.svg"
import ViteIcon from "@/assets/vite.svg"
import NodeIcon from "@/assets/node_js.svg"
import TypescriptIcon from "@/assets/typescript.svg"
import ExpressIcon from "@/assets/expressjs.svg"
import MongodbIcon from "@/assets/mongodb.svg"
import { Button } from "@/components/ui/button"

const Home = () => {
    const features = [
        { icon: <img src={ReactIcon} />, title: 'React', description: 'Frontend Library' },
        { icon: <img src={ViteIcon} />, title: 'Vite', description: 'Build Tool' },
        { icon: <img src={TypescriptIcon} />, title: 'Typescript', description: 'Strongly Typed Language' },
        { icon: <img src={NodeIcon} />, title: 'Node.js', description: 'Backend Runtime' },
        { icon: <img src={ExpressIcon} />, title: 'Express', description: 'Backend Framework' },
        { icon: <img src={MongodbIcon} />, title: 'MongoDB', description: 'Database' },
    ];

    return (
        <div className="min-h-screen bg-background py-12">
            <Container>
                <div className="space-y-6 text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tighter text-foreground">
                        MERN Boilerplate Template
                    </h1>
                    <p className="text-muted-foreground">
                        A modern stack for building fast, scalable web applications
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                                <div className="text-primary h-12 w-12">
                                    {feature.icon}
                                </div>
                                <CardTitle className="mt-4">{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center mt-12 gap-2">
                    <a href="https://github.com/TheAsadIqbal/MERN-Boilerplate">
                        <Button>
                            Github Repo
                        </Button>
                    </a>
                    <a href="https://www.linkedin.com/in/the-asad-iqbal/">
                        <Button>
                            Follow me
                        </Button>
                    </a>
                </div>
            </Container>
        </div>
    );
};

export default Home;
