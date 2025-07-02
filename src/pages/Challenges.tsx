import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ChallengeCard from "@/components/ChallengeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// 임시 데이터 - 더 많은 챌린지들
const mockAllChallenges = [
  {
    id: "1",
    title: "함께 읽는 미드나잇 라이브러리",
    book: "미드나잇 라이브러리",
    author: "매트 헤이그",
    startDate: "2024-07-01",
    endDate: "2024-07-14",
    participants: 8,
    maxParticipants: 15,
    genre: "소설",
    difficulty: "쉬움"
  },
  {
    id: "2", 
    title: "원피스 완독 챌린지",
    book: "원피스 1권",
    author: "오다 에이치로",
    startDate: "2024-07-05",
    endDate: "2024-07-19",
    participants: 12,
    maxParticipants: 20,
    genre: "만화",
    difficulty: "쉬움"
  },
  {
    id: "3",
    title: "사피엔스로 역사 배우기",
    book: "사피엔스",
    author: "유발 하라리",
    startDate: "2024-07-10",
    endDate: "2024-07-31",
    participants: 5,
    maxParticipants: 10,
    genre: "인문",
    difficulty: "어려움"
  },
  {
    id: "4",
    title: "소년이 온다 함께 읽기",
    book: "소년이 온다",
    author: "한강",
    startDate: "2024-07-15",
    endDate: "2024-07-29",
    participants: 3,
    maxParticipants: 12,
    genre: "소설",
    difficulty: "보통"
  },
  {
    id: "5",
    title: "부의 법칙 스터디",
    book: "부의 법칙",
    author: "제프 무어",
    startDate: "2024-07-20",
    endDate: "2024-08-10",
    participants: 7,
    maxParticipants: 15,
    genre: "경제",
    difficulty: "보통"
  },
  {
    id: "6",
    title: "백년의 고독 깊이 읽기",
    book: "백년의 고독",
    author: "가브리엘 가르시아 마르케스",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    participants: 2,
    maxParticipants: 8,
    genre: "소설",
    difficulty: "어려움"
  }
];

export default function Challenges() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "챌린지에 참여했습니다!",
      description: "이제 함께 읽어보세요."
    });
  };

  const getStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return "upcoming";
    if (now > end) return "completed";
    return "active";
  };

  const filteredChallenges = mockAllChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = genreFilter === "all" || challenge.genre === genreFilter;
    const matchesDifficulty = difficultyFilter === "all" || challenge.difficulty === difficultyFilter;
    
    const status = getStatus(challenge.startDate, challenge.endDate);
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "recruiting" && status === "upcoming" && challenge.participants < challenge.maxParticipants) ||
                         (statusFilter === "active" && status === "active") ||
                         (statusFilter === "completed" && status === "completed");
    
    return matchesSearch && matchesGenre && matchesDifficulty && matchesStatus;
  });

  const genres = [...new Set(mockAllChallenges.map(c => c.genre))];
  const difficulties = [...new Set(mockAllChallenges.map(c => c.difficulty))];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">독서 챌린지 둘러보기</h1>
          <p className="text-muted-foreground">다양한 독서 챌린지를 찾아보고 참여해보세요.</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="lg:col-span-2">
            <Input
              placeholder="챌린지명, 책 제목, 작가명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 상태</SelectItem>
              <SelectItem value="recruiting">모집 중</SelectItem>
              <SelectItem value="active">진행 중</SelectItem>
              <SelectItem value="completed">완료</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger>
              <SelectValue placeholder="장르" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 장르</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="난이도" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 난이도</SelectItem>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                총 {filteredChallenges.length}개의 챌린지
              </span>
              <div className="flex gap-2">
                {searchTerm && (
                  <Badge variant="outline">
                    검색: {searchTerm}
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {genreFilter !== "all" && (
                  <Badge variant="outline">
                    장르: {genreFilter}
                    <button 
                      onClick={() => setGenreFilter("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {difficultyFilter !== "all" && (
                  <Badge variant="outline">
                    난이도: {difficultyFilter}
                    <button 
                      onClick={() => setDifficultyFilter("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge variant="outline">
                    상태: {statusFilter === "recruiting" ? "모집 중" : statusFilter === "active" ? "진행 중" : "완료"}
                    <button 
                      onClick={() => setStatusFilter("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>
            <Button onClick={() => navigate('/create-challenge')}>
              새 챌린지 만들기
            </Button>
          </div>
        </div>

        {/* Challenge Grid */}
        {filteredChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <div key={challenge.id} className="relative">
                <ChallengeCard
                  {...challenge}
                  onJoin={handleJoinChallenge}
                  onView={(id) => navigate(`/challenge/${id}`)}
                />
                <div className="absolute top-4 right-4 flex gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {challenge.genre}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      challenge.difficulty === "쉬움" ? "border-success text-success" :
                      challenge.difficulty === "보통" ? "border-accent text-accent" :
                      "border-destructive text-destructive"
                    }`}
                  >
                    {challenge.difficulty}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">검색 결과가 없어요</h3>
            <p className="text-muted-foreground mb-6">다른 검색 조건을 시도해보세요.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setGenreFilter("all");
                setDifficultyFilter("all");
                setStatusFilter("all");
              }}
            >
              필터 초기화
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}