from openai import OpenAI
from fix import OCR
image_read =OCR.read()

client = OpenAI(
    api_key="nv-0cf2b2bd366f4963b198fe46390a5691OmyT",  # CLOVA Studio API 키
    base_url="https://clovastudio.stream.ntruss.com/v1/openai"  # CLOVA Studio 오픈AI 호환 API URL 
)

# Chat Completions
response = client.chat.completions.create(
    model="HCX-005",  # CLOVA Studio 지원 모델명
    messages=[
        {"role": "system", "content": "input 으로 들어온 텍스트중에 상품이름, 그 상품의 가격 파악해서 dictionary 형태로 return 해줘. N pay나오면 무시해.  코드짜지 말고 너가 맥락 파악해서 만들어. 다른건 다 필요없어, 답장은 그냥 dictionary 하나, 끝."},
        {"role": "user", "content": f"{image_read}\n"}
    ]
)

print(response.choices[0].message.content)
print("\n\n\n\n\n")

# Embeddings
embedding = client.embeddings.create(
    model="bge-m3", # CLOVA Studio 지원 모델명 (임베딩)
    input="클로바 스튜디오를 이용해 주셔서 감사합니다.",
    encoding_format="float" # 오픈AI Python SDK로 임베딩을 이용하는 경우, 필수 설정(base64 미지원)
    )
    
#print(embedding.data[0].embedding)
