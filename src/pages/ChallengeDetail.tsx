import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon, Users } from "lucide-react";

// 임시 챌린지 데이터
const mockChallengeDetail = {
  id: "1",
  title: "함께 읽는 미드나잇 라이브러리",
  book: "미드나잇 라이브러리",
  author: "매트 헤이그",
  description: "인생의 무한한 가능성에 대해 이야기하는 감동적인 소설입니다. 함께 읽으며 서로의 생각을 나눠보아요.",
  startDate: "2024-07-01",
  endDate: "2024-07-14",
  participants: 8,
  maxParticipants: 15,
  inviteCode: "ABC123",
  rules: "매일 최소 10페이지 읽기, 주 3회 이상 독서 기록 남기기",
  penalty: "하루 미달성 시 스터디 카페 커피 쏘기",
  participantsList: [
    { id: 1, name: "김덕빈", progress: 65, currentPage: 130, totalPages: 200 },
    { id: 2, name: "이민수", progress: 70, currentPage: 140, totalPages: 200 },
    { id: 3, name: "박소영", progress: 45, currentPage: 90, totalPages: 200 },
    { id: 4, name: "정현우", progress: 80, currentPage: 160, totalPages: 200 },
    { id: 5, name: "최유진", progress: 55, currentPage: 110, totalPages: 200 },
    { id: 6, name: "강민호", progress: 60, currentPage: 120, totalPages: 200 },
    { id: 7, name: "윤서현", progress: 75, currentPage: 150, totalPages: 200 },
    { id: 8, name: "임태양", progress: 50, currentPage: 100, totalPages: 200 }
  ],
  records: [
    {
      id: 1,
      user: "김덕빈",
      date: "2024-07-02",
      pages: "120-130p",
      content: "노라가 다양한 삶을 경험하는 장면이 인상깊었어요. '후회는 도서관에서 가장 무거운 책이다'라는 문장이 마음에 남습니다.",
      type: "quote"
    },
    {
      id: 2,
      user: "이민수",
      date: "2024-07-02",
      pages: "130-140p",
      content: "철학과 물리학에 대한 내용이 흥미로웠습니다. 무한한 가능성에 대한 작가의 관점이 새로웠어요.",
      type: "thought"
    },
    {
      id: 3,
      user: "박소영",
      date: "2024-07-01",
      pages: "80-90p",
      content: "노라의 후회가 너무 현실적이라 공감이 됐어요. 우리 모두에게 있는 '만약에'에 대한 생각들...",
      type: "thought"
    }
  ]
};

export default function ChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(true); // 임시로 참여 상태

  const handleJoinChallenge = () => {
    setIsJoined(true);
    // 실제로는 서버에 참여 요청
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-success";
    if (progress >= 60) return "bg-reading-progress";
    if (progress >= 40) return "bg-accent";
    return "bg-destructive";
  };

  const daysLeft = Math.ceil((new Date(mockChallengeDetail.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Challenge Header */}
        <Card className="shadow-book mb-8">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">진행중</Badge>
                  <Badge variant="outline">D-{daysLeft}</Badge>
                </div>
                <h1 className="text-3xl font-bold">{mockChallengeDetail.title}</h1>
                <div className="text-lg text-muted-foreground">
                  <div className="font-medium">{mockChallengeDetail.book}</div>
                  <div>by {mockChallengeDetail.author}</div>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  {mockChallengeDetail.description}
                </p>
              </div>
              
              <div className="space-y-4 lg:text-right">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">초대코드</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {mockChallengeDetail.inviteCode}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(mockChallengeDetail.inviteCode)}
                    >
                      복사
                    </Button>
                  </div>
                </div>
                
                {!isJoined ? (
                  <Button onClick={handleJoinChallenge} size="lg">
                    챌린지 참여하기
                  </Button>
                ) : (
                  <Button onClick={() => navigate(`/challenge/${id}/record`)} size="lg">
                    독서 기록 작성하기
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Challenge Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <CalendarIcon className="w-5 h-5 mr-2" />
                기간
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {new Date(mockChallengeDetail.startDate).toLocaleDateString()} - {new Date(mockChallengeDetail.endDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2" />
                참여자
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {mockChallengeDetail.participants}/{mockChallengeDetail.maxParticipants}명 참여
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">평균 진행률</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round(mockChallengeDetail.participantsList.reduce((acc, p) => acc + p.progress, 0) / mockChallengeDetail.participantsList.length)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenge Details Tabs */}
        <Tabs defaultValue="participants" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
            <TabsTrigger value="participants">참여자</TabsTrigger>
            <TabsTrigger value="records">독서 기록</TabsTrigger>
            <TabsTrigger value="info">상세 정보</TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>참여자별 진행 상황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChallengeDetail.participantsList.map((participant) => (
                    <div key={participant.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{participant.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{participant.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {participant.currentPage}/{participant.totalPages}p ({participant.progress}%)
                        </div>
                      </div>
                      <div className="ml-11">
                        <Progress 
                          value={participant.progress} 
                          className={`h-2 ${getProgressColor(participant.progress)}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-4">
            {mockChallengeDetail.records.map((record) => (
              <Card key={record.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{record.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{record.user}</span>
                        <Badge variant="outline" className="text-xs">{record.pages}</Badge>
                        <span className="text-xs text-muted-foreground">{record.date}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{record.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>챌린지 규칙</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{mockChallengeDetail.rules}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>페널티</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{mockChallengeDetail.penalty}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}