import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-card shadow-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">📚</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">독서챌린지</h1>
        </div>
        
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            홈
          </Button>
          <Button variant="ghost" onClick={() => navigate('/challenges')}>
            챌린지 둘러보기
          </Button>
          <Button variant="outline" onClick={() => navigate('/login')}>
            로그인
          </Button>
          <Button onClick={() => navigate('/create-challenge')}>
            챌린지 만들기
          </Button>
        </nav>
      </div>
    </header>
  );
}