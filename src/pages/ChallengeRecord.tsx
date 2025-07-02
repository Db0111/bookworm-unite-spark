import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// 임시 챌린지 데이터
const mockChallenge = {
  id: "1",
  title: "함께 읽는 미드나잇 라이브러리",
  book: "미드나잇 라이브러리",
  author: "매트 헤이그",
  totalPages: 200,
  currentPage: 130
};

export default function ChallengeRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [recordData, setRecordData] = useState({
    startPage: "",
    endPage: "",
    content: "",
    type: "thought",
    isPublic: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recordData.startPage || !recordData.endPage || !recordData.content) {
      toast({
        title: "모든 필드를 입력해주세요",
        variant: "destructive"
      });
      return;
    }

    const startPage = parseInt(recordData.startPage);
    const endPage = parseInt(recordData.endPage);

    if (startPage > endPage) {
      toast({
        title: "시작 페이지는 끝 페이지보다 작아야 합니다",
        variant: "destructive"
      });
      return;
    }

    if (endPage > mockChallenge.totalPages) {
      toast({
        title: `페이지 번호는 ${mockChallenge.totalPages}페이지를 초과할 수 없습니다`,
        variant: "destructive"
      });
      return;
    }

    // 실제로는 서버에 기록 저장
    toast({
      title: "독서 기록이 저장되었습니다!",
      description: "다른 참여자들과 함께 나누어요."
    });

    navigate(`/challenge/${id}`);
  };

  const getRecordTypeLabel = (type: string) => {
    switch (type) {
      case "quote": return "인상 깊은 문장";
      case "thought": return "나의 생각";
      case "question": return "궁금한 점";
      case "summary": return "내용 정리";
      default: return "나의 생각";
    }
  };

  const getRecordTypeDescription = (type: string) => {
    switch (type) {
      case "quote": return "책에서 인상 깊었던 문장이나 구절을 공유해보세요";
      case "thought": return "읽으면서 든 생각이나 감상을 자유롭게 적어보세요";
      case "question": return "읽으면서 궁금했던 점이나 토론하고 싶은 내용을 적어보세요";
      case "summary": return "읽은 내용을 간단히 정리해보세요";
      default: return "읽으면서 든 생각이나 감상을 자유롭게 적어보세요";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Challenge Info */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{mockChallenge.title}</h1>
                <p className="text-muted-foreground">{mockChallenge.book} - {mockChallenge.author}</p>
              </div>
              <Badge variant="outline">
                {mockChallenge.currentPage}/{mockChallenge.totalPages}p
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Record Form */}
        <Card className="shadow-book">
          <CardHeader>
            <CardTitle className="text-2xl">독서 기록 작성</CardTitle>
            <p className="text-muted-foreground">
              오늘 읽은 내용을 기록하고 다른 참여자들과 공유해보세요.
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 읽은 페이지 범위 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startPage">시작 페이지 *</Label>
                  <Input
                    id="startPage"
                    type="number"
                    min="1"
                    max={mockChallenge.totalPages}
                    placeholder="예: 120"
                    value={recordData.startPage}
                    onChange={(e) => setRecordData({...recordData, startPage: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endPage">끝 페이지 *</Label>
                  <Input
                    id="endPage"
                    type="number"
                    min="1"
                    max={mockChallenge.totalPages}
                    placeholder="예: 130"
                    value={recordData.endPage}
                    onChange={(e) => setRecordData({...recordData, endPage: e.target.value})}
                  />
                </div>
              </div>

              {/* 기록 유형 선택 */}
              <div className="space-y-2">
                <Label>기록 유형 *</Label>
                <Select value={recordData.type} onValueChange={(value) => setRecordData({...recordData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thought">💭 나의 생각</SelectItem>
                    <SelectItem value="quote">📝 인상 깊은 문장</SelectItem>
                    <SelectItem value="question">❓ 궁금한 점</SelectItem>
                    <SelectItem value="summary">📋 내용 정리</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {getRecordTypeDescription(recordData.type)}
                </p>
              </div>

              {/* 기록 내용 */}
              <div className="space-y-2">
                <Label htmlFor="content">{getRecordTypeLabel(recordData.type)} *</Label>
                <Textarea
                  id="content"
                  placeholder={
                    recordData.type === "quote" 
                      ? "인상 깊었던 문장이나 구절을 인용해주세요..."
                      : recordData.type === "question"
                      ? "궁금한 점이나 토론하고 싶은 내용을 적어주세요..."
                      : recordData.type === "summary"
                      ? "읽은 내용을 간단히 요약해주세요..."
                      : "읽으면서 든 생각이나 감상을 자유롭게 적어주세요..."
                  }
                  value={recordData.content}
                  onChange={(e) => setRecordData({...recordData, content: e.target.value})}
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* 공개 설정 */}
              <div className="space-y-2">
                <Label>공개 설정</Label>
                <Select 
                  value={recordData.isPublic ? "public" : "private"} 
                  onValueChange={(value) => setRecordData({...recordData, isPublic: value === "public"})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">🌐 참여자들과 공유</SelectItem>
                    <SelectItem value="private">🔒 나만 보기</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {recordData.isPublic 
                    ? "다른 참여자들이 이 기록을 볼 수 있습니다" 
                    : "이 기록은 나만 볼 수 있습니다"
                  }
                </p>
              </div>

              {/* 진행률 표시 */}
              {recordData.endPage && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">예상 진행률</h4>
                  <div className="text-sm text-muted-foreground">
                    {parseInt(recordData.endPage) || 0}페이지 / {mockChallenge.totalPages}페이지 
                    ({Math.round(((parseInt(recordData.endPage) || 0) / mockChallenge.totalPages) * 100)}%)
                  </div>
                </div>
              )}

              {/* 제출 버튼 */}
              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(`/challenge/${id}`)} 
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="submit" className="flex-1">
                  기록 저장하기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 유용한 팁 */}
        <Card className="mt-6 border-accent/20 bg-accent/5">
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">💡 독서 기록 작성 팁</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 인상 깊은 문장: 페이지 번호와 함께 정확히 인용해주세요</li>
              <li>• 나의 생각: 개인적인 경험이나 감정과 연결해서 적어보세요</li>
              <li>• 궁금한 점: 다른 참여자들과 토론할 수 있는 질문을 던져보세요</li>
              <li>• 내용 정리: 주요 사건이나 인물의 변화를 간단히 요약해보세요</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}